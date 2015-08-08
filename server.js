import co from 'co';
import koa from 'koa';
import send from 'koa-send';

import mongo from './server/config/mongo';
import * as controllers from 'server/controllers';
import reactBootstrap from 'server/reactBootstrap';

const PORT = process.env.PORT || 3000;

const app = koa();

co(function *() {
  yield mongo.connect();

  reactBootstrap(app);

  Object.keys(controllers).map(k => controllers[k](app));

  app.listen(PORT, () => console.log('Server listening on', PORT));
});
