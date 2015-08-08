import comongo from 'co-mongo';
import config from './config';

const connect = comongo.connect;
comongo.connect = function *() {
  if (comongo.db) yield comongo.db.close();

  // export mongo db instance
  const db = comongo.db = yield connect(config.mongo.url);

  // export default collections
  comongo.entries = yield db.collection('entries');
};

export default comongo;
