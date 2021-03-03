import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchShownImages(){
    try{
        const allShownImages = yield axios.get(`/api/image/shown`);
        yield put({type: 'SET_SHOWN_IMAGES', payload: allShownImages.data});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE SHOWN IMAGES ${error}`);
    }
}

function* fetchImagesByDate(action){
    try{
        const searchedImagesByDateResponse = yield axios.get(`/api/image/date?q=${action.payload}`);
        yield put({type: 'SET_IMAGES', payload: searchedImagesByDateResponse.data});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE IMAGES BY DATE ${error}`);
    }
}

//TODO - Get all images from the last 5 hours, plus all images where "show" = true
//Need another as well that gets all images from the current day
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
    yield takeLatest('FETCH_SHOWN_IMAGES', fetchShownImages);
  }

export default gallerySaga;