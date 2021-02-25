const cartReducer = (state = [], action) => {
    if (action.type === 'ADD_TO_CART') {
        return [...state, action.payload];
    }
    else if (action.type === 'REMOVE_FROM_CART') {
        return state.filter(image => image.id != action.payload.id);
    }else if (action.type === 'CLEAR_CART'){
        console.log ('CLEAR CART')
        return [];
    }
    return state;
};

export default cartReducer;