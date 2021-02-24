import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gallery from './gallery.reducer.js';

const rootReducer = combineReducers({
  errors,
  user,
  gallery
});

export default rootReducer;
