import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { errorConstants, userConstants, loginConstants } from '../../_constants';

function* loginUser(action) {
  try {
    yield put({ type: errorConstants.CLEAR });
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/user/login', action.payload, config);
    yield put({ type: userConstants.FETCH });
  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {

      yield put({ type: errorConstants.FAILED });
    } else {
      yield put({ type: errorConstants.NO_CODE });
    }
  }
}

function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/user/logout', config);
    yield put({ type: userConstants.SET });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginGuest(action){
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/user/login', {
      username: 'guest',
      password: action.payload.password
    }, config);
    yield put({ type: userConstants.FETCH });
  }
  catch(err){
    console.log(err);
    yield put({ type: errorConstants.GUEST });
  }
}

function* loginSaga() {
  yield takeLatest(loginConstants.LOGIN, loginUser);
  yield takeLatest(loginConstants.LOGOUT, logoutUser);
  yield takeLatest(loginConstants.LOGIN_GUEST, loginGuest);
}

export default loginSaga;
