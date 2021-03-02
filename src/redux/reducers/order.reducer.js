const orderReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return action.payload;
        case 'CLEAR_ORDERS':
            return [];
        default:
            return state;
    }
}

export default orderReducer;