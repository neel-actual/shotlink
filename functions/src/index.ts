import * as functions from 'firebase-functions';
import * as request from 'request';
// const config = functions.config();
const BITLY_TOKEN = '7db656c989f354ea2e25f02a265937ccadda426d';
const BITLY_URL = 'https://api-ssl.bitly.com/v4/shorten';

export const shortenUrl = functions.https.onCall((data) => {
  return new Promise((resolve, reject) => {
    request({
      url: BITLY_URL,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        accept: 'application/json',
        authorization: 'Bearer ' + BITLY_TOKEN
      },
      json: true,
      body: {
        long_url: data.url
      }
    }, function(err, res, body) {
      if (err) { reject(err); }

      resolve({ data: body });
    });
  });
});
