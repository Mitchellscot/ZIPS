import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* sendEmail(action){
    try{
        yield axios.post(`/api/email`, {
            name: action.payload.name,
            email: action.payload.email,
            images: action.payload.images,
            total: action.payload.total,
            orderId: action.payload.orderId
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