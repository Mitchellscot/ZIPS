import { emailConstants } from '../../_constants';

const initialState = {pager: {}, pageOfEmails: []};

const emailReducer = (state = initialState, action) => {
    switch (action.type) {
        case emailConstants.SEARCH_RESULTS:
            return {
                ...state,
                pager: action.payload.pager,
                pageOfEmails: action.payload.pageOfEmails
            }
        case emailConstants.CLEAR_STATE:
            return {
                pager: {},
                pageOfEmails: []
            };
        default:
            return state;
    }
}

export default emailReducer;