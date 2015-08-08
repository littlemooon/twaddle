import mongo from '../config/mongo';

const ObjectID = mongo.ObjectID;

export function *getEntries() {
  const entries = yield mongo.entries.find(
    {'deletedTime': {'$exists': false}}
  ).toArray()
  return entries.map(entry => ({...entry, id: entry._id}));
}

export function *createEntry(entry) {
  return yield mongo.entries.insert(
    {...entry, createdTime: new Date()}
  );
}

export function *updateEntry(id, entry) {
  return yield mongo.entries.update(
    {_id: ObjectID(id)},
    {...entry, updatedTime: new Date()}
  );
}

export function *deleteEntry(id) {
  return yield mongo.entries.update(
    {_id: ObjectID(id)},
    {$set: {deletedTime: new Date()}}
  );
}
