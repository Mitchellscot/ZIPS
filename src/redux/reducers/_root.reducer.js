import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gallery from './gallery.reducer.js';
import cart from './cart.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  gallery,
  cart
});

export default rootReducer;
