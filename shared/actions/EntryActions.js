import request from 'superagent-bluebird-promise';
import { createAction } from 'redux-actions';

import { get, create, update, remove } from 'lib/api';

export const getEntries = createAction('GET_ENTRIES', get('entry'));

export const createEntry = createAction('CREATE_ENTRY', create('entry'));

export const editEntry = createAction('EDIT_ENTRY', update('entry'));

export const deleteEntry = createAction('DELETE_ENTRY', remove('entry'));
