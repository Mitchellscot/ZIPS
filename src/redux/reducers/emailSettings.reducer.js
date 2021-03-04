const emailSettingsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMAILSETTINGS':
            return action.payload;
        case 'CLEAR_EMAILSETTINGS':
            return [];
        default:
            return state;
    }
}

export default emailSettingsReducer;