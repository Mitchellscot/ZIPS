import { combineReducers } from 'redux';

const galleryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        case 'RESET_IMAGES':
            return [];
        default:
            return state;
    }
}

const initialState1 = {pager: {}, pageOfImages: [], date: ''};
const shownImagesReducer = (state = initialState1, action) => {
    switch (action.type) {
        case 'SET_SHOWN_IMAGES':
            return {
                date: action.payload.date,        
                pager: action.payload.pager,
                pageOfImages: action.payload.pageOfImages
            }
        case 'RESET_SHOWN_IMAGES':
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
        case 'SET_PICTURES':
            return {
            /*  ...state,*/     
                date: action.payload.date,        
                pager: action.payload.pager,
                pageOfPictures: action.payload.pageOfPictures
            }
            case 'RESET_PICTURES':
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