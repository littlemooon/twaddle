import { List } from 'immutable';
import { handleActions } from 'redux-actions';

let id = 0;

export default handleActions({

  GET_ENTRIES: (state, action) => {
    return state;
  },

  CREATE_ENTRY: (state, action) => {
    const entry = {...action.payload, id: id, createdDate: Date.now()};
    id = id + 1;
    return state.concat(entry);
  },

  EDIT_ENTRY: (state, action) => {
    const { payload } = action;
    const entry = {...payload, updatedDate: Date.now()};
    return state.set(payload.id, entry);
  },

  DELETE_ENTRY: (state, action) => {
    return state.delete(action.payload.id);
  },

}, new List());
