import { fromJS } from 'immutable';

export default function(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fromJS(obj[key]);
    return acc;
  }, {});
}
