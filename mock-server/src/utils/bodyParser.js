/**
  * bodyParser.js
  * Helper asíncrono para capturar y deserializar el cuerpo JSON de peticiones POST/PUT.
  */

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        if (!body) {
          resolve({});
        } else {
          resolve(JSON.parse(body));
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = parseJsonBody;
