import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchOrdersByDate(action){
    try{
        const searchedOrdersByDateResponse = yield axios.get(`/api/order/date?q=${action.payload}`);
        yield put({type: 'SET_ORDERS', payload: searchedOrdersByDateResponse.data});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS BY DATE ${error}`);
    }
}

function* fetchSearchedOrders(action) {
    try {
        const searchedOrdersResponse = yield axios.get(`/api/order?q=${action.payload}`);
        yield put({type: 'SET_ORDERS', payload: searchedOrdersResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE SEARCHED ORDERS ${error}`);
    }
}

function* fetchAllOrders(action) {
    try {
        const orderResponse = yield axios.get(`/api/order?page=${page}`, {
           pager: action.payload.pager,
           pageOfOrders: action.payload.pageOfOrders 
        });
        //todo: set this up for reducer success 
        yield put({type: 'SET_ORDERS', payload: orderResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS ${error}`);
    }
}

function* addOrder(action){
    try{
        yield axios.post(`/api/order/`, {
            name: action.payload.name,
            email: action.payload.email,
            total: action.payload.total,
            images: action.payload.images
        });
        // I don't think I need this... 
        yield put({type: 'FETCH_ORDERS'});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN"T ADD THE ORDER - ${order}`);
    }
}

function* orderSaga() {
    yield takeEvery('ADD_ORDER', addOrder);
    yield takeEvery('FETCH_ALL_ORDERS', fetchAllOrders);
    yield takeEvery('SEARCH_ORDERS', fetchSearchedOrders);
    yield takeEvery('SEARCH_ORDER_DATES', fetchOrdersByDate);
  }

export default orderSaga;