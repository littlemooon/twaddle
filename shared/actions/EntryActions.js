import { createAction } from 'redux-actions';

export const getEntries = createAction('GET_ENTRIES');

export const createEntry = createAction('CREATE_ENTRY');

export const editEntry = createAction('EDIT_ENTRY');

export const deleteEntry = createAction('DELETE_ENTRY');
