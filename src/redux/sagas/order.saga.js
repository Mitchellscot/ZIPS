import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchOrdersByDate(action){
    try{
        const page = action.payload.page;
        const searchedOrdersByDateResponse = yield axios.get(`/api/order/date?q=${action.payload}&page=${page}`);
        yield put({type: 'SET_ORDERS', payload: {
            pageOfOrders: searchedOrdersByDateResponse.data.pageOfOrders,
            pager: searchedOrdersByDateResponse.data.pager
        }});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS BY DATE ${error}`);
    }
}

function* fetchSearchedOrders(action) {
    try {
        const page = action.payload.page;
        const searchedOrdersResponse = yield axios.get(`/api/order?q=${action.payload.q}&page=${page}`);
        yield put({type: 'SET_ORDERS', payload: {
            pageOfOrders: searchedOrdersResponse.data.pageOfOrders,
            pager: searchedOrdersResponse.data.pager
        }});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE SEARCHED ORDERS ${error}`);
    }
}

function* fetchAllOrders(action) {
    try {
        const page = action.payload.page;
        const orderResponse = yield axios.get(`/api/order?page=${page}`, {
           pager: action.payload.pager,
           pageOfOrders: action.payload.pageOfOrders 
        });
        yield put({type: 'SET_ORDERS', payload: {
            pager: orderResponse.data.pager, 
            pageOfOrders: orderResponse.data.pageOfOrders}});
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