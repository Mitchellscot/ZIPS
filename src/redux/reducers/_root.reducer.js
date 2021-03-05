import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gallery from './gallery.reducer.js';
import cart from './cart.reducer';
import orders from './order.reducer';
import emails from './email.reducer';
import emailSettings from './emailSettings.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  gallery,
  cart,
  orders,
  emails,
  emailSettings
});

export default rootReducer;
