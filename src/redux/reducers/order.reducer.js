const initialState = {pager: {}, pageOfOrders: []};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                pager: action.pager,
                pageOfOrders: action.pageOfOrders
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