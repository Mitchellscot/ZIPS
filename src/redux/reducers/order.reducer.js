import { orderConstants, searchTypes } from '../../_constants';

const initialState = {pager: {}, pageOfOrders: [], date: '', text: '', type: searchTypes.ALL};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderConstants.SEARCH_RESULTS:
            return {
                pager: action.payload.pager,
                pageOfOrders: action.payload.pageOfOrders,
                date: action.payload.date,
                text: action.payload.text,
                type: action.payload.type
            }
        case orderConstants.CLEAR_STATE:
            return {
                pager: {},
                pageOfOrders: [],
                date: '',
                text: '',
                type: searchTypes.ALL
            };
        default:
            return state;
    }
}

export default orderReducer;