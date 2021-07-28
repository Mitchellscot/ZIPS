import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { emailConstants } from '../../_constants';

function* sendEmail(action){
    try{
        yield axios.post(`/api/email`, {
            name: action.payload.name,
            email: action.payload.email,
            images: action.payload.images,
            total: action.payload.total,
            orderId: action.payload.orderId
        });
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T SEND THE EMAIL (SAGA) - ${error}`);
    }
}


function* emailSaga() {
    yield takeEvery(emailConstants.SEND, sendEmail);
  }

export default emailSaga;