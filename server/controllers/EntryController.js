import route from 'koa-route';
import parse from 'co-body';

import * as EntryService from '../services/EntryService';

export default function(app) {
  app.use(route.get('/api/entry/', getEntries));
  app.use(route.post('/api/entry/', createEntry));
  app.use(route.post('/api/entry/:id', updateEntry));
};

function *getEntries() {
  this.body = yield EntryService.getEntries();
}

function *createEntry() {
  const entry = yield parse(this);
  const results = yield EntryService.createEntry(entry);
  this.status = results.length > 0 ? 201 : 500;
  this.body = results[0];
}

function *updateEntry(id) {
  const entry = yield parse(this);
  const result = yield EntryService.updateEntry(id, entry);
  this.status = result ? 201 : 500;
  this.body = result;
}
