const initialState = {pager: {}, pageOfOrders: []};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                ...state,
                pager: action.payload.pager,
                pageOfOrders: action.payload.pageOfOrders
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