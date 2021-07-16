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

//gets all images that match a given date - able to paginate (that's why it's SET_PICTURES)
function* fetchPictures(action){
    try{
        const searchedImagesByDateResponse = yield axios.get(`/api/image/date?q=${action.payload.q}&page=${action.payload.page}`);
        yield put({type: 'SET_PICTURES', payload: {
            pager: searchedImagesByDateResponse.data.pager,
            pageOfPictures: searchedImagesByDateResponse.data.pageOfPictures
        }});
    }
    catch(error){
        console.log(`HEY MITCH - COULDN'T GET THE IMAGES BY DATE ${error}`);
    }
}

// gets all images that are 5 hours old
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
    yield takeLatest('FETCH_PICTURES', fetchPictures);
    yield takeLatest('FETCH_SHOWN_IMAGES', fetchShownImages);
  }

export default gallerySaga;