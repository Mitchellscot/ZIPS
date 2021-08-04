import { errorConstants } from '../../_constants';

const loginMessage = (state = '', action) => {
  switch (action.type) {
    case errorConstants.CLEAR:
      return '';
    case errorConstants.INPUT:
      return 'Enter your username and password!';
    case errorConstants.GUEST:
      return 'Incorrect Password';
    case errorConstants.FAILED:
      return "Oops! The username and password didn't match. Try again!";
    case errorConstants.NO_CODE:
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

export default loginMessage;
