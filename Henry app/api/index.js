//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const crypto = require('crypto');
const db = require('./src/db.js');
const init = require('./init.js');
function createPromise(model, value) {
  return new Promise((res, rej) => {
    model.create(value)
      .then(instance => res(instance))
      .catch(err => rej(err));
  })
}
async function initial() {
  await db.Feedback.sync({ force: true });
  await db.Nota.sync({ force: true });
  const promises = {};
  for (let model in init) {
    await db[model].sync({ force: true });
    promises[model] = init[model].map(e => {
      if (model === "Grupo") {
        e.nombre = `web_ft${e.cohorteId}_(nombre del pm)`;
      }
      if (model === "Usuario") {
        e.salt = crypto.randomBytes(64).toString("hex");
        e.password = crypto.pbkdf2Sync(e.password, e.salt, 10000, 64, "sha512").toString("base64");
      }
      createPromise(db[model], e);
    });
    await Promise.all(promises[model]);
  }
}
// Syncing all the models at once.
db.conn.sync().then(async () => {
  await initial();
  server.listen(3006, () => {
    console.log('%s listening at 3006'); // eslint-disable-line no-console
  });
});
