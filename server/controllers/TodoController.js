import route from 'koa-route';
import parse from 'co-body';

import * as TodoService from '../services/TodoService';

export default function(app) {
  app.use(route.get('/api/todo/', getTodos));
  app.use(route.post('/api/todo', createTodo));
  app.use(route.put('/api/todo/:id', updateTodo));
  app.use(route.del('/api/todo/:id', deleteTodo));
};

function *getTodos() {
  this.body = yield TodoService.getTodos(userId);
}

function *createTodo() {
  const todo = yield parse(this);
  const results = yield TodoService.createTodo(todo);
  this.status = 201;
  this.body = results[0];
}

function *updateTodo(id) {
  const { text } = yield parse(this);
  yield TodoService.updateTodo(id, {text});
  this.status = 201;
}

function *deleteTodo(id) {
  yield TodoService.deleteTodo(id);
  this.status = 201;
}
