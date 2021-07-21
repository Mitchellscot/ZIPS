import { emailConstants } from '../../_constants';

const initialState = {pager: {}, pageOfEmails: [], date: '', text: ''};

const emailReducer = (state = initialState, action) => {
    switch (action.type) {
        case emailConstants.SEARCH_RESULTS:
            return {
                ...state,
                pager: action.payload.pager,
                pageOfEmails: action.payload.pageOfEmails,
                date: action.payload.date,
                text: action.payload.text
            }
        case emailConstants.CLEAR_STATE:
            return {
                pager: {},
                pageOfEmails: [],
                date: '',
                text: ''
            };
        default:
            return state;
    }
}

export default emailReducer;