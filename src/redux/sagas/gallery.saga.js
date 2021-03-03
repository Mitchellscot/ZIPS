import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchImagesByDate(action){
    try{
        const searchedImagesByDateResponse = yield axios.get(`/api/image/date?q=${action.payload}`);
        yield put({type: 'SET_IMAGES', payload: searchedImagesByDateResponse.data});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS BY DATE ${error}`);
    }
}

function* fetchGallery() {
    try {
        const galleryResponse = yield axios.get('/api/image');
        yield put({type: 'SET_IMAGES', payload: galleryResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE PICTURES ${error}`);
    }
}

function* gallerySaga() {
    yield takeLatest('FETCH_GALLERY', fetchGallery);
    yield takeLatest('SEARCH_IMAGE_DATES', fetchImagesByDate);
  }

export default gallerySaga;