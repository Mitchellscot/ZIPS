import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

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

function* fetchEmails() {
    try {
        const emailsResponse = yield axios.get('/api/email');
        yield put({type: 'SET_EMAILS', payload: emailsResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE EMAILS ${error}`);
    }
}

function* emailSaga() {
    yield takeEvery('SEND_EMAIL', sendEmail);
    yield takeEvery('FETCH_EMAIL_HISTORY', fetchEmails);
  }

export default emailSaga;