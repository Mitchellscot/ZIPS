import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { galleryConstants } from '../../_constants';

//gets all images that are marked as show=true
function* fetchShownImages(action){
    try{
        const allShownImages = yield axios.get(`/api/image/shown?q=${action.payload.q}&page=${action.payload.page}`);
        //console.log(`${}`);
        yield put({type: galleryConstants.SET_SHOWN, payload: {
            date: allShownImages.data.date,
            pager: allShownImages.data.pager,
            pageOfImages: allShownImages.data.pageOfImages
        }});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE SHOWN IMAGES ${error}`);
    }
}

function* fetchPictures(action){
    try{
        const searchedImagesByDateResponse = yield axios.get(`/api/image/date?q=${action.payload.q}&page=${action.payload.page}`);
        yield put({type: galleryConstants.SET_PICTURES, payload: {
            date: searchedImagesByDateResponse.data.date,
            pager: searchedImagesByDateResponse.data.pager,
            pageOfPictures: searchedImagesByDateResponse.data.pageOfPictures
        }});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE IMAGES BY DATE ${error}`);
    }
}

// gets all images that are 3 hours old
function* fetchGallery() {
    try {
        const galleryResponse = yield axios.get('/api/image');
        yield put({type: galleryConstants.SET_GALLERY, payload: galleryResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE PICTURES ${error}`);
    }
}

function* gallerySaga() {
    yield takeLatest(galleryConstants.FETCH_GALLERY, fetchGallery);
    yield takeLatest(galleryConstants.FETCH_PICTURES, fetchPictures);
    yield takeLatest(galleryConstants.FETCH_SHOWN, fetchShownImages);
  }

export default gallerySaga;