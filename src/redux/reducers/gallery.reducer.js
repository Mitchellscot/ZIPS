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

export default galleryReducer;