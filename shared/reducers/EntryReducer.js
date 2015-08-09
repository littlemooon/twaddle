import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

const sort = (prop, state) => state.sortBy(x => x[prop]);

export default handleActions({

  GET_ENTRIES: (state, action) => {
    const { payload } = action;
    return payload.reduce((acc, entry) => acc.set(entry.id, entry), state);
  },

  CREATE_ENTRY: (state, action) => {
    const { payload } = action;
    return state.set(payload.id, payload);
  },

  EDIT_ENTRY: (state, action) => {
    const { payload } = action;
    return state.set(payload.id, payload);
  },

  DELETE_ENTRY: (state, action) => {
    const { payload } = action;
    return state.delete(payload.id);
  },

}, new Map());
