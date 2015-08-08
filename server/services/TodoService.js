import mongo from '../config/mongo';

const ObjectID = mongo.ObjectID;

export function *getTodos() {
  return yield mongo.todos.find(
    {'deletedTime': {'$exists': false}}
  ).toArray().map(todo => ({...todo, id: todo._id}));
}

export function *createTodo(todo) {
  return yield mongo.todos.insert(
    {...todo, createdTime: new Date()}
  );
}

export function *updateTodo(id, todo) {
  return yield mongo.todos.update(
    {_id: ObjectID(id)},
    {...todo, updatedTime: new Date()}
  );
}

export function *deleteTodo(id) {
  return yield mongo.todos.update(
    {_id: ObjectID(id)},
    {$set: {deletedTime: new Date()}}
  );
}
