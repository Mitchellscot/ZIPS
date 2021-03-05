const emailSettingsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMAIL_SETTINGS':
            return action.payload;
        case 'CLEAR_EMAIL_SETTINGS':
            return [];
        default:
            return state;
    }
}

export default emailSettingsReducer;