import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Setup memory storage for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB max file size
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const N8N_FORM_URL = 'https://madhulathachintala5.app.n8n.cloud/form/49b9a0ad-119b-46e1-a6ea-abea514a85ae';

// API: Health / Workflow status ping
app.get('/api/workflow-status', async (_req, res) => {
  try {
    const startTime = Date.now();
    const response = await fetch(N8N_FORM_URL, {
      method: 'GET',
      headers: { 'Accept': 'text/html,application/json' },
    });
    const latency = Date.now() - startTime;

    if (response.ok) {
      return res.json({
        online: true,
        workflow: 'Resume Analyzer',
        latencyMs: latency,
        status: response.status,
      });
    }
    return res.json({
      online: false,
      workflow: 'Resume Analyzer',
      latencyMs: latency,
      status: response.status,
    });
  } catch (error) {
    return res.json({
      online: false,
      workflow: 'Resume Analyzer',
      error: error instanceof Error ? error.message : 'Unknown connection error',
    });
  }
});

// API: Submit resume to n8n form workflow
app.post('/api/submit-resume', upload.single('resume'), async (req, res) => {
  try {
    const name = (req.body.name || req.body['field-0'] || '').trim();
    const email = (req.body.email || req.body['field-1'] || '').trim();
    const file = req.file;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Candidate name is required.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid candidate email is required.' });
    }
    if (!file) {
      return res.status(400).json({ success: false, error: 'Please upload a resume file (PDF, DOCX, or TXT).' });
    }

    // Build standard FormData conforming to n8n form schema
    const formData = new FormData();
    formData.append('field-0', name);
    formData.append('field-1', email);

    // Convert file buffer to Uint8Array Blob
    const uint8 = new Uint8Array(file.buffer);
    const fileBlob = new Blob([uint8], { type: file.mimetype || 'application/octet-stream' });
    formData.append('field-2', fileBlob, file.originalname);

    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
    });

    const responseText = await n8nResponse.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // response might be raw text or HTML
    }

    if (n8nResponse.ok) {
      return res.json({
        success: true,
        message: 'Resume received successfully by the workflow engine.',
        candidateName: name,
        candidateEmail: email,
        fileName: file.originalname,
        fileSize: file.size,
        n8nData: responseJson || { raw: responseText.slice(0, 300) },
      });
    }

    return res.status(n8nResponse.status).json({
      success: false,
      error: `Workflow execution failed (${n8nResponse.status}).`,
      details: responseText.slice(0, 500),
    });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error while dispatching to n8n.',
    });
  }
});

// Setup Vite in Dev or Static in Production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Resume Analyzer Server running on port ${PORT}`);
  });
}

startServer();
