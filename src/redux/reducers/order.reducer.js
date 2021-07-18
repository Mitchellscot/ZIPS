const initialState = {pager: {}, pageOfOrders: [], date: ''};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                ...state,
                pager: action.payload.pager,
                pageOfOrders: action.payload.pageOfOrders,
                date: action.payload.date
            }
        case 'CLEAR_ORDERS':
            return {
                pager: {},
                pageOfOrders: []
            };
        default:
            return state;
    }
}

export default orderReducer;