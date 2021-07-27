import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gallery from './gallery.reducer.js';
import cart from './cart.reducer';
import orders from './order.reducer';
import emailSettings from './emailSettings.reducer';
import cost from './cost.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  gallery,
  cart,
  orders,
  emailSettings,
  cost
});

export default rootReducer;
