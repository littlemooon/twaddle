import request from 'axios';
const BACKEND_URL = '/api/todo';

export function getTodos() {
  return {
    type: 'GET_TODOS',
    promise: request.get(BACKEND_URL)
  };
}

export function createTodo(text) {
  return {
    type: 'CREATE_TODO',
    promise: request.post(BACKEND_URL, { text })
  };
}

export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}

export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}
