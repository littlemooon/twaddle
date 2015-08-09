import mongo from '../config/mongo';

const ObjectID = mongo.ObjectID;

export function *getEntries() {
  const entries = yield mongo.entries.find(
    {'deletedTime': {'$exists': false}}
  ).toArray();
  return addIds(entries);
}

export function *createEntry(entry) {
  const entries = yield mongo.entries.insert(
    {...entry, createdTime: new Date()}
  );
  return addIds(entries);
}

export function *updateEntry(id, entry) {
  const updatedEntry = {...entry, updatedTime: new Date()};
  const result = yield mongo.entries.update(
    {_id: ObjectID(id)},
    updatedEntry
  );
  // return result[0] === 1 && updatedEntry;
  return updatedEntry;
}

const addIds = (entries) =>
  entries.map(entry => ({...entry, id: entry._id}));
