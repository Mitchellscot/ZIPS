import { emailConstants } from '../../_constants';
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchEmailsByDate(action){
    try{
        const date = action.payload.query;
        const page = action.payload.page;
        const searchedEmailsByDateResponse = yield axios.get(`/api/email/date?q=${date}&page=${page}`);
        yield put({type: emailConstants.SEARCH_RESULTS, payload: {
            pageOfEmails: searchedEmailsByDateResponse.data.pageOfEmails, 
            pager: searchedEmailsByDateResponse.data.pager,
            date: searchedEmailsByDateResponse.data.date,
            text: ''
        }});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS BY EMAILS BY DATE ${error}`);
    }
}

function* fetchEmailsByText(action) {
    try {
        const text = action.payload.query;
        const page = action.payload.page;
        console.log(`here is text ${text}`);
        const searchedEmailsResponse = yield axios.get(`/api/email/text?q=${text}&page=${page}`);
        yield put({type: emailConstants.SEARCH_RESULTS, payload: {
            pageOfEmails: searchedEmailsResponse.data.pageOfEmails,
            pager: searchedEmailsResponse.data.pager,
            date: '',
            text: searchedEmailsResponse.data.text
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

function* fetchAllEmails(action) {
    try {
        const page = action.payload.page;
        const emailsResponse = yield axios.get(`/api/email/all?page=${page}`);
        yield put({type: emailConstants.SEARCH_RESULTS, payload: {
            pager: emailsResponse.data.pager,
            pageOfEmails: emailsResponse.data.pageOfEmails,
            date: '',
            text: ''
        }});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE EMAILS ${error}`);
    }
}

function* emailSaga() {
    yield takeEvery('SEND_EMAIL', sendEmail);
    yield takeEvery(emailConstants.SEARCH_ALL, fetchAllEmails);
    yield takeEvery(emailConstants.SEARCH_TEXT, fetchEmailsByText);
    yield takeEvery(emailConstants.SEARCH_DATE, fetchEmailsByDate);
  }

export default emailSaga;