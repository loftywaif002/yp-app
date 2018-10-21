import { 
  USER_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_STARTED,
  SIGNUP_FAILURE,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_STARTED,
  UPDATE_NAME_FAILURE
} from './types';
import axios from 'axios';
import { push } from 'connected-react-router'
var querystring = require('querystring');

export const Signup = (requestBody) => {
  return dispatch => {
    dispatch(SignupStarted());
    
     //Making a POST REQUEST

 const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
   }
}

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
        this.setState({error});
        alert(`Error ${this.state.error}`);
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
        this.setState({error});
        alert(`Error ${this.state.error}`);
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


