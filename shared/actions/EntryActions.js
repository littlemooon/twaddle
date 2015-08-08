import request from 'axios';
const BACKEND_URL = '/api/entry';

export function getEntries() {
  return {
    type: 'GET_ENTRIES',
    promise: request.get(BACKEND_URL)
  };
}

export function createEntry(text) {
  return {
    type: 'CREATE_ENTRY',
    promise: request.post(BACKEND_URL, { text })
  };
}

export function editEntry(id, text) {
  return {
    type: 'EDIT_ENTRY',
    id,
    text,
    date: Date.now()
  };
}

export function deleteEntry(id) {
  return {
    type: 'DELETE_ENTRY',
    id
  };
}
