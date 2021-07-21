import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { orderConstants } from '../../_constants';

function* fetchOrdersByDate(action){
    try{
        const page = action.payload.page;
        const date = action.payload.query;
        console.log(`Here is date: ${date}`);
        const searchedOrdersByDateResponse = yield axios.get(`/api/order/date?q=${date}&page=${page}`);
        yield put({type: orderConstants.SEARCH_RESULTS, payload: {
            pageOfOrders: searchedOrdersByDateResponse.data.pageOfOrders,
            pager: searchedOrdersByDateResponse.data.pager,
            date: searchedOrdersByDateResponse.data.date,
            text: ''
        }});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS BY DATE ${error}`);
    }
}

function* fetchOrdersByText(action) {
    try {
        const page = action.payload.page;
        const text = action.payload.query;
        const searchedOrdersResponse = yield axios.get(`/api/order/text?q=${text}&page=${page}`);
        yield put({type: orderConstants.SEARCH_RESULTS, payload: {
            pageOfOrders: searchedOrdersResponse.data.pageOfOrders,
            pager: searchedOrdersResponse.data.pager,
            date: '',
            text: searchedOrdersResponse.data.text
        }});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE SEARCHED ORDERS ${error}`);
    }
}

function* fetchAllOrders(action) {
    try {
        const page = action.payload.page;
        const orderResponse = yield axios.get(`/api/order/all?page=${page}`);
        yield put({type: orderConstants.SEARCH_RESULTS, payload: {
            pager: orderResponse.data.pager, 
            pageOfOrders: orderResponse.data.pageOfOrders,
            date: '',
            text: ''
        }});
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
        //yield put({type: 'FETCH_ORDERS'});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T ADD THE ORDER - ${error}`);
    }
}

function* orderSaga() {
    yield takeEvery('ADD_ORDER', addOrder);
    yield takeEvery(orderConstants.SEARCH_ALL, fetchAllOrders);
    yield takeEvery(orderConstants.SEARCH_TEXT, fetchOrdersByText);
    yield takeEvery(orderConstants.SEARCH_DATE, fetchOrdersByDate);
  }

export default orderSaga;