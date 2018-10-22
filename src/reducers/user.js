import { 
  USER_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_STARTED,
  SIGNUP_FAILURE,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_STARTED,
  UPDATE_NAME_FAILURE,
  UPDATE_EMAIL_SUCCESS, 
  UPDATE_EMAIL_STARTED,
  UPDATE_EMAIL_FAILURE,
  QUERY_STARTED, 
  QUERY_SUCCESS,
  QUERY_FAILURE,
  LOGOUT_STARTED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE 
} from '../actions/types.js';


const INITIAL_STATE = {
  loading: false,
  loggedIn: false,
  user: [],
  result: [],
  queryFetched: false,
  error: null
};
/*Update loggedIn var later*/
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
    case UPDATE_NAME_STARTED:
      return {
        ...state,
        loading: true
      };
    case UPDATE_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        error: null,
        user: [...state.user, action.payload]
      };
    case UPDATE_NAME_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        error: action.payload.error
      };
      case UPDATE_EMAIL_STARTED:
      return {
        ...state,
        loading: true
      };
    case UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        error: null,
        user: [...state.user, action.payload]
      };
    case UPDATE_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        error: action.payload.error
      };
      case QUERY_STARTED:
      return {
        ...state,
        loading: true
      };
      case QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        queryFetched: true,
        error: null,
        result: [...state.result, action.payload]
      };
      case QUERY_FAILURE:
       return {
        ...state,
        loading: false,
        loggedIn: true,
        error: action.payload.error
      };
      case LOGOUT_STARTED:
       return {
        ...state,
        loading: true
      };
      case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: [],
        result: [],
        queryFetched: false,
        error: null
      };
      case LOGOUT_FAILURE:
        return {
        ...state,
        loading: false,
        loggedIn: true,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export default userReducer;
