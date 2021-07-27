import { cartConstants } from '../../_constants';

const cartReducer = (state = [], action) => {
    if (action.type === cartConstants.ADD) {
        return [...state, action.payload];
    }
    else if (action.type === cartConstants.REMOVE) {
        return state.filter(image => image.id != action.payload.id);
    }else if (action.type === cartConstants.CLEAR){
        return [];
    }
    return state;
};

export default cartReducer;