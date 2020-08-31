import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { INITIAL_CONFIG } from '@angular/platform-server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/my-app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('/api/answer', (req, res) => {
    if (req.ip.match(/127\.0\.0\.1/)) {
      res.json(`hello admin, this is the answer: ${process.env.FLAG}`)
    } else {
      res.status(500).send('Access restricted!')
    }
  });

  server.get('/api/true-answer', (req, res) => {
    if (req.ip.match(/127\.0\.0\.1/)) {
      res.json(`hello admin, this is true answer: ${process.env.FLAG2}`)
    } else {
      res.status(500).send('Access restricted!')
    }
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    if (process.env.FLAG && req.path.includes('debug')) {
      return res.status(500).send('debug page is disabled in production env')
    }

    res.render(indexHtml, {
      req,
      url: '',
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
      ]
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
