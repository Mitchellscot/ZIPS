import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchEmailsByDate(action){
    try{
        const searchedEmailsByDateResponse = yield axios.get(`/api/email/date?q=${action.payload}`);
        yield put({type: 'SET_EMAILS', payload: searchedEmailsByDateResponse.data});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS BY EMAILS BY DATE ${error}`);
    }
}

function* fetchSearchedEmails(action) {
    try {
        const searchedEmailsResponse = yield axios.get(`/api/email?q=${action.payload}`);
        yield put({type: 'SET_EMAILS', payload: searchedEmailsResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE SEARCHED EMAILS ${error}`);
    }
}

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
    yield takeLatest('SEARCH_EMAILS', fetchSearchedEmails );
    yield takeLatest('SEARCH_EMAIL_DATES', fetchEmailsByDate);
  }

export default emailSaga;