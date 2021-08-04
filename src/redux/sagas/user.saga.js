import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { userConstants } from '../../_constants';

function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: userConstants.SET, payload: response.data });
  } catch (error) {
    console.log('HEY MITCH - COULDNT GET USER', error);
  }
}

function* userSaga() {
  yield takeLatest(userConstants.FETCH, fetchUser);
}

export default userSaga;
