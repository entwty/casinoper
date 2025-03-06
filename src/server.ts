import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import axios from 'axios';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();



// API Proxy Endpoint'i
app.get('/api/proxy/games', async (req, res) => {
  try {
    const apiUrl = 'https://slotslaunch.com/api/games?token=ztZkBKlkIrbywe8gHTCCvV6vb2M1toitHBBXalbqYu5Tq5rqWS';
    console.log('API isteği gönderiliyor:', apiUrl);

    const response = await axios.get(apiUrl, {
      headers: {
        'Origin': 'casinoper845.com',
      },
      timeout: 5000, // 5 saniye zaman aşımı
    });

    console.log('API yanıtı:', response.data); // API yanıtını logla
    res.json(response.data); // Yanıtı istemciye gönder
  } catch (error) {
    console.error('API isteği başarısız:', error);

    // error'un bir Error nesnesi olup olmadığını kontrol et
    if (error instanceof Error) {
      res.status(500).json({ error: 'API isteği başarısız oldu.', details: error.message });
    } else {
      res.status(500).json({ error: 'API isteği başarısız oldu.', details: 'Bilinmeyen bir hata oluştu.' });
    }
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