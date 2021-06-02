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

const shownImagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SHOWN_IMAGES':
            return action.payload;
        case 'RESET_SHOWN_IMAGES':
            return [];
        default:
            return state;
    }
}
const initialState = {pager: {}, pageOfOrders: []};

const picturePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PICTURES':
            return {
                ...state,
                pager: action.payload.pager,
                pageOfPictures: action.payload.pageOfPictures
            }
        default:
            return state;
    }
}

export default combineReducers({
    galleryReducer,
    shownImagesReducer,
    picturePageReducer
});