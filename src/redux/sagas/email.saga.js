import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* sendEmail(action){
    try{
        yield axios.post(`/api/email`, {
            name: action.payload.name,
            email: action.payload.email,
            images: action.payload.images
        });
        yield put({type: 'FETCH_ORDERS'});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T SEND THE EMAIL (SAGA) - ${error}`);
    }
}

function* emailSaga() {
    yield takeEvery('SEND_EMAIL', sendEmail);
  }

export default emailSaga;