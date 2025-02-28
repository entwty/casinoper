import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// CSP Middleware'ini ekleyin
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; frame-src *; connect-src *; img-src * data:;"
  );
  next();
});
/**
 * API Endpoint'leri
 * Örnek olarak /api/games endpoint'ini ekleyelim.
 */
app.get('/api/games', async (req, res) => {
  try {
    const response = await fetch('https://slotslaunch.com/api/games?token=ztZkBKlkIrbywe8gHTCCvV6vb2M1toitHBBXalbqYu5Tq5rqWS', {
      headers: {
        'Origin': 'casinoper845.com',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('API isteği başarısız:', error);
    res.status(500).json({ error: 'API isteği başarısız oldu.' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);