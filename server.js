require('babel/register')({});
const co = require('co');
const koa = require('koa');

const mongo = require('./server/config/mongo');
const controllers = require('server/controllers');

const reactBootstrap = require('./reactBootstrap');

const PORT = process.env.PORT || 3000;

const app = koa();

co(function *() {
  yield mongo.connect();

  reactBootstrap(app);

  Object.keys(controllers).map(function(k) {
    controllers[k](app);
  });

  app.listen(PORT, function() {
    console.log('Server listening on', PORT);
  });
});
