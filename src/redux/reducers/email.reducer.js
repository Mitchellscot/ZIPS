const emailReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMAILS':
            return action.payload;
        case 'CLEAR_EMAILS':
            return [];
        default:
            return state;
    }
}

export default emailReducer;