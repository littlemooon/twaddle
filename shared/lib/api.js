import request from 'superagent-bluebird-promise';

const BASE_URL = 'http://localhost:3000/api';

export const get = (type) => async () => {
  const url = `${BASE_URL}/${type}`;
  return _get(url);
};

export const create = (type) => async (payload) => {
  const url = `${BASE_URL}/${type}`;
  return _post(url, payload);
};

export const update = (type) => async (payload) => {
  const url = `${BASE_URL}/${type}/${payload.id}`;
  return _post(url, payload);
};

export const remove = (type) => async (payload) => {
  const url = `${BASE_URL}/${type}/${payload.id}`;
  return _post(url, {...payload, deletedTime: new Date()});
};

const _get = async (url) => {
  const result = await request.get(url).promise();
  return result.body;
};

const _post = async (url, payload) => {
  const result = await request.post(url).send(payload).promise();
  return result.body;
};
