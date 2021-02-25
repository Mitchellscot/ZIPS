import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addOrder(action){
    try{
        yield axios.post(`/api/order/`, {
            name: action.payload.name,
            email: action.payload.email,
            total: action.payload.total,
            images: action.payload.images
        });
        yield put({type: 'IDONTKNOWYET'});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN"T ADD THE ORDER - ${order}`);
    }
}

function* orderSaga() {
    yield takeEvery('ADD_ORDER', addOrder);
  }

export default orderSaga;