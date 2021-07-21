import { orderConstants } from '../../_constants';

const initialState = {pager: {}, pageOfOrders: [], date: '', text: ''};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderConstants.SEARCH_RESULTS:
            return {
                ...state,
                pager: action.payload.pager,
                pageOfOrders: action.payload.pageOfOrders,
                date: action.payload.date,
                text: action.payload.text
            }
        case orderConstants.CLEAR_STATE:
            return {
                pager: {},
                pageOfOrders: [],
                date: '',
                text: ''
            };
        default:
            return state;
    }
}

export default orderReducer;