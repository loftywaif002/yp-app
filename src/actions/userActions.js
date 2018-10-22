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
} from './types';
import axios from 'axios';
import { push } from 'connected-react-router'
var querystring = require('querystring');

/*
  Function accepts a request body as a JSON object and serialize before making a PUT request to the server
  to Register User in the Database
*/

export const Signup = (requestBody) => {
  return dispatch => {
    dispatch(SignupStarted());
    
axios({
  method: 'post',
  url: 'http://localhost:5000/signup',
  data: querystring.stringify(requestBody), // you are sending body instead
  headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
  }, 
   }).then((user)=>{
         dispatch(SignupSuccess(user));
         dispatch(push('/dashboard'));
   }).catch(error => {
        dispatch(SignupFailure(error));
    });

  };
};

const SignupStarted = () => ({
  type: SIGNUP_STARTED
});

const SignupSuccess = user => ({  
  type: SIGNUP_SUCCESS,
  payload: {
    ...user
  }
});

const SignupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: { error }
});

/*
  Function accepts a request body as a JSON object and serialize before making a PUT request to the server
  to update user names
*/

export const UpdateNames = (requestBody) => {
  return dispatch => {
     dispatch(UpdateNameStarted());
    //Making a PUT REQUEST
    axios({
    method: 'put',
    url: 'http://localhost:5000/updatenames',
    data: querystring.stringify(requestBody), // you are sending body instead
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
    }, 
     }).then((user)=>{
          console.log("redux method");
          console.log(user);
          dispatch(UpdateNameSuccess(user));
     }).catch(error => {
        dispatch(UpdateNameFailure(error));
      });  
  };
};

const UpdateNameStarted = () => ({
  type: UPDATE_NAME_STARTED
});

const UpdateNameSuccess = user => ({  
  type: UPDATE_NAME_SUCCESS,
  payload: {
    ...user
  }
});

const UpdateNameFailure = error => ({
  type: UPDATE_NAME_FAILURE,
  payload: { error }
});


/*
  Function accepts a request body as a JSON object and serialize before making a PUT request to the server
  to update user email address
*/

export const UpdateEmail = (requestBody) => {
  return dispatch => {
      dispatch(UpdateEmailStarted());
      //Making a PUT REQUEST
          axios({
          method: 'put',
          url: 'http://localhost:5000/updateEmails',
          data: querystring.stringify(requestBody), // you are sending body instead
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, 
           }).then((user)=>{
              console.log("from email component axios call");
              console.log(user);
              dispatch(UpdateEmailSuccess(user));
           }).catch(error => {
              dispatch(UpdateEmailFailure(error));
        }); 
      
  };
};

const UpdateEmailStarted = () => ({
  type: UPDATE_EMAIL_STARTED
});

const UpdateEmailSuccess = user => ({  
  type: UPDATE_EMAIL_SUCCESS,
  payload: {
    ...user
  }
});

const UpdateEmailFailure = error => ({
  type: UPDATE_EMAIL_FAILURE,
  payload: { error }
});


/*
  Function accepts a request body as a JSON object and serialize before making a PUT request to the server
  to QUERY DATABASE FOR CUSTOM SEARCH PARAMETER
*/

export const QueryDatabase = (requestBody) => {
  return dispatch => {
       dispatch(QueryStarted());
      //Making a post using query
      axios({
           method: 'post',
           url: 'http://localhost:5000/query',
           data: querystring.stringify(requestBody), // you are sending body instead
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, 
           }).then((user)=>{
              dispatch(QuerySuccess(user));
           }).catch(error => {
              dispatch(QueryFailure(error));
        });   
      
  };
};


const QueryStarted = () => ({
  type: QUERY_STARTED
});

const QuerySuccess = user => ({  
  type: QUERY_SUCCESS,
  payload: {
    ...user
  }
});

const QueryFailure = error => ({
  type: QUERY_FAILURE,
  payload: { error }
});


/*
  User LOGOUT ACTION
*/
export const UserLogOut = (requestBody) => {
  return dispatch => {
       dispatch(LogOutStarted());
       axios({
           method: 'post',
           url: 'http://localhost:5000/logout'
           }).then(()=>{
               console.log("successfully logged out");
               dispatch(LogOutSuccess());
               dispatch(push('/')); 
           }).catch(error => {
              console.log(error);
              dispatch(LogOutFailure(error));
        }); 
   };
};

const LogOutStarted = () => ({
  type: LOGOUT_STARTED
});

const LogOutSuccess = () => ({  
  type: LOGOUT_SUCCESS
});

const LogOutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: { error }
});