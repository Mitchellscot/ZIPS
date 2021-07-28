import { userConstants } from "../../_constants";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.SET:
      return action.payload;
    case userConstants.RESET:
      return {};
    default:
      return state;
  }
};

export default userReducer;
