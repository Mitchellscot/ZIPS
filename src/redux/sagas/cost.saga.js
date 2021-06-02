import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCost() {
    try {
        const costResponse = yield axios.get('/api/cost');
        yield put({type: 'SET_COST', payload: {
            price: costResponse.data.price,
            tax: costResponse.data.tax
            }});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE EMAILS ${error}`);
    }
}

function* costSaga() {
    yield takeLatest('FETCH_COST', fetchCost);
  }

export default costSaga;