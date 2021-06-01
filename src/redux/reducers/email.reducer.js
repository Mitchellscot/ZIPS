const initialState = {pager: {}, pageOfEmails: []};

const emailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMAILS':
            return {
                ...state,
                pager: action.payload.pager,
                pageOfEmails: action.payload.pageOfEmails
            }
        case 'CLEAR_EMAILS':
            return {
                pager: {},
                pageOfEmails: []
            };
        default:
            return state;
    }
}

export default emailReducer;