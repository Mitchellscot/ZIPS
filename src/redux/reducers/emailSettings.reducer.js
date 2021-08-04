import { emailConstants } from '../../_constants';

const emailSettingsReducer = (state = [], action) => {
    switch (action.type) {
        case emailConstants.SET:
            return action.payload;
        case emailConstants.CLEAR:
            return [];
        default:
            return state;
    }
}

export default emailSettingsReducer;