import { combineReducers } from 'redux';
import { galleryConstants } from '../../_constants';

const galleryReducer = (state = [], action) => {
    switch (action.type) {
        case galleryConstants.SET_GALLERY:
            return action.payload;
        case galleryConstants.RESET_GALLERY:
            return [];
        default:
            return state;
    }
}

const initialState1 = {pager: {}, pageOfImages: [], date: ''};
const shownImagesReducer = (state = initialState1, action) => {
    switch (action.type) {
        case galleryConstants.SET_SHOWN:
            return {
                date: action.payload.date,        
                pager: action.payload.pager,
                pageOfImages: action.payload.pageOfImages
            }
        case galleryConstants.RESET_SHOWN:
            return {
                date: '',
                pager: {},
                pageOfPictures: []
            };
        default:
            return state;
    }
}
const initialState2 = {pager: {}, pageOfPictures: [], date: ''};
const picturePageReducer = (state = initialState2, action) => {
    switch (action.type) {
        case galleryConstants.SET_PICTURES:
            return {
            /*  ...state,*/     
                date: action.payload.date,        
                pager: action.payload.pager,
                pageOfPictures: action.payload.pageOfPictures
            }
            case galleryConstants.RESET_PICTURES:
                return {
                    date: '',
                    pager: {},
                    pageOfPictures: []
                };
        default:
            return state;
    }
}

export default combineReducers({
    galleryReducer,
    shownImagesReducer,
    picturePageReducer
});