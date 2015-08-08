import route from 'koa-route';
import parse from 'co-body';

import * as EntryService from '../services/EntryService';

export default function(app) {
  app.use(route.get('/api/entry/', getEntries));
  app.use(route.post('/api/entry', createEntry));
  app.use(route.put('/api/entry/:id', updateEntry));
  app.use(route.del('/api/entry/:id', deleteEntry));
};

function *getEntries() {
  this.body = yield EntryService.getEntries(userId);
}

function *createEntry() {
  const entry = yield parse(this);
  const results = yield EntryService.createEntry(entry);
  this.status = 201;
  this.body = results[0];
}

function *updateEntry(id) {
  const { text } = yield parse(this);
  yield EntryService.updateEntry(id, {text});
  this.status = 201;
}

function *deleteEntry(id) {
  yield EntryService.deleteEntry(id);
  this.status = 201;
}
