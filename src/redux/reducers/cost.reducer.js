const initialState = {price: 0, tax: 0};

const costReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COST':
            return {
                price: action.payload.price,
                tax: action.payload.tax
            }
            
        default:
            return state;
    }
}

export default costReducer;