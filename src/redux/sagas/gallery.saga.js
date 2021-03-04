import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//gets all images that are marked as show=true
function* fetchShownImages(){
    try{
        const allShownImages = yield axios.get(`/api/image/shown`);
        yield put({type: 'SET_SHOWN_IMAGES', payload: allShownImages.data});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE SHOWN IMAGES ${error}`);
    }
}

//gets all images that match a given date
function* fetchImagesByDate(action){
    try{
        const searchedImagesByDateResponse = yield axios.get(`/api/image/date?q=${action.payload}`);
        yield put({type: 'SET_IMAGES', payload: searchedImagesByDateResponse.data});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE IMAGES BY DATE ${error}`);
    }
}

//Gets all images that were created today
function* fetchTodaysImages() {
    try {
        const galleryResponse = yield axios.get('/api/image/today');
        yield put({type: 'SET_IMAGES', payload: galleryResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE PICTURES ${error}`);
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
    yield takeLatest('FETCH_SHOWN_IMAGES', fetchShownImages);
    yield takeLatest('FETCH_TODAYS_IMAGES', fetchTodaysImages)
  }

export default gallerySaga;