import { 
  USER_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_STARTED,
  SIGNUP_FAILURE
} from '../actions/types.js';


const INITIAL_STATE = {
  loading: false,
  loggedIn: false,
  user: [],
  error: null
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_STARTED:
      return {
        ...state,
        loading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        error: null,
        user: [...state.user, action.payload]
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export default userReducer;
