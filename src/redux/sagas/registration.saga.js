import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* registerUser(action) {
  try {

    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    yield axios.post('/api/user/register', action.payload);
    yield put({ type: 'LOGIN', payload: action.payload });
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
