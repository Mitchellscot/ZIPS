import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import userSaga from './user.saga';
import gallerySaga from './gallery.saga';
import orderSaga from './order.saga';
import emailSaga from './email.saga';
import emailSettingsSaga from './emailSettings.saga.js';
import costSaga from './cost.saga.js';

export default function* rootSaga() {
  yield all([
    gallerySaga(),
    orderSaga(),
    loginSaga(),
    userSaga(),
    emailSaga(),
    emailSettingsSaga(),
    costSaga()
  ]);
}
