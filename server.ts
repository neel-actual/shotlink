/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

import * as express from 'express';
import 'zone.js/dist/zone-node';
import {join} from 'path';
import * as request from 'request';
import 'localstorage-polyfill';
global['localStorage'] = localStorage;

// Express server
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const BITLY_URL = 'https://api-ssl.bitly.com/v4/shorten';
const BITLY_TOKEN = process.env.BITLY_TOKEN;

// const BITLY_TOKEN = process.env.BITLY_TOKEN || require('./.env').BITLY_TOKEN;
import * as cors from 'cors';

// app.use(cors({
//   origin: (origin, callback) => {
//     // allow requests with no origin
//     if (!origin) { return callback(null, true); }
//     if (['http://localhost:4200', 'http://localhost:4000'].indexOf(origin) === -1) {
//       return callback(new Error('message'), false);
//     }
//     return callback(null, true);
//   }
// }));

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [ provideModuleMap(LAZY_MODULE_MAP) ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
app.get('/api/shorten', (req, res) => {
  const options = {
    method: 'POST',
    url: BITLY_URL,
    headers: { 'cache-control': 'no-cache',
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: 'Bearer ' + BITLY_TOKEN
    },
    body: { long_url: req.query.url },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) { throw new Error(error); }

    res.send(body);
  });
});

// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => { res.render('index', { req }); });

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
