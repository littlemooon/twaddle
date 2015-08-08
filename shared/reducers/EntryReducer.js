import { List } from 'immutable';

const defaultState = new List();

export default function(state = defaultState, action) {
  switch(action.type) {
    case 'GET_ENTRIES':
      return state.concat(action.res.data);
    case 'CREATE_ENTRY':
      return state.concat(action.res.data.text);
    case 'EDIT_ENTRY':
      return state.set(action.id, action.text);
    case 'DELETE_ENTRY':
      return state.delete(action.id);
    default:
      return state;
  }
}
