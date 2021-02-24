import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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
  }

export default gallerySaga;