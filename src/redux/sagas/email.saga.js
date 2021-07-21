import { emailConstants } from '../../_constants';
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchEmailsByDate(action){
    try{
        const q = action.payload.q;
        const page = action.payload.page;
        const searchedEmailsByDateResponse = yield axios.get(`/api/email/date?q=${q}&page=${page}`);
        yield put({type: 'SET_EMAILS', payload: {
            pageOfEmails: searchedEmailsByDateResponse.data.pageOfEmails, 
            pager: searchedEmailsByDateResponse.data.pager
        }});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS BY EMAILS BY DATE ${error}`);
    }
}

function* fetchSearchedEmails(action) {
    try {
        const q = action.payload.q;
        const page = action.payload.page;
        const searchedEmailsResponse = yield axios.get(`/api/email?q=${q}&page=${page}`);
        yield put({type: 'SET_EMAILS', payload: {
            pageOfEmails: searchedEmailsResponse.data.pageOfEmails,
            pager: searchedEmailsResponse.data.pager
        }
    });
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

function* fetchEmails(action) {
    try {
        const page = action.payload.page;
        const emailsResponse = yield axios.get(`/api/email/all?page=${page}`);
        yield put({type: emailConstants.SEARCH_RESULTS, payload: {
            pager: emailsResponse.data.pager,
            pageOfEmails: emailsResponse.data.pageOfEmails,
            date: ''
        }});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE EMAILS ${error}`);
    }
}

function* emailSaga() {
    yield takeEvery('SEND_EMAIL', sendEmail);
    yield takeEvery( emailConstants.SEARCH_ALL, fetchEmails);
    yield takeLatest('SEARCH_EMAILS', fetchSearchedEmails );
    yield takeLatest('SEARCH_EMAIL_DATES', fetchEmailsByDate);
  }

export default emailSaga;