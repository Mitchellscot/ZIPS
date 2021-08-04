import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { costConstants } from '../../_constants';

function* fetchCost() {
    try {
        const costResponse = yield axios.get('/api/cost');
        yield put({type: costConstants.SET, payload: {
            price: costResponse.data.price,
            tax: costResponse.data.tax
            }});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE EMAILS ${error}`);
    }
}

function* costSaga() {
    yield takeLatest(costConstants.FETCH, fetchCost);
  }

export default costSaga;