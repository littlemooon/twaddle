import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

let id = 0;

const sort = (prop, state) => state.sortBy(x => x[prop]);

export default handleActions({

  GET_ENTRIES: (state, action) => {
    return sort(action.sortBy, state);
  },

  CREATE_ENTRY: (state, action) => {
    id = id + 1;
    const { payload, sortBy } = action;
    const entry = {...payload, id: id, createdDate: Date.now()};
    return sort(sortBy, state.set(id, entry));
  },

  EDIT_ENTRY: (state, action) => {
    const { payload, sortBy } = action;
    const entry = {...payload, updatedDate: Date.now()};
    return sort(sortBy, state.set(payload.id, entry));
  },

  DELETE_ENTRY: (state, action) => {
    const { payload, sortBy } = action;
    return sort(sortBy, state.delete(id));
  },

}, new Map());
