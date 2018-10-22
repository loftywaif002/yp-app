import React, { Component} from "react";

import Navbar from '../NavBar';
import Footer from '../Footer';

import './style.css';
import { connect } from 'react-redux';
import fblogo from '../../assets/fb-logo.png';
import googlelogo from '../../assets/google_plus.png';
import ProgressBar from '../../components/LinearProgress';
var querystring = require('querystring');


import {Signup} from '../../actions/userActions';

const INITIAL_STATE = {
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    retypedPass:"",
    zipcode:"",
    emailError: false,
    passwordError: false,
    error: ""
};

class SignUp extends Component{

  constructor(props){
   super(props);
     this.onSubmit = this.onSubmit.bind(this);
     this.validateEmail = this.validateEmail.bind(this);
     this.passwordMatched = this.passwordMatched.bind(this);
     this.state = { ...INITIAL_STATE };
  }

  
  //Handle First Name
  handleFirstName(e){
    let firstname = e.target.value;
    this.setState({firstname});
  }

  handleLastName(e){
    let lastname = e.target.value;
    this.setState({lastname});
  }

  //Handle email
  handleEmail(e){
   let email = e.target.value;
   this.setState({email, emailError: false});
  }

  //Handle Password
  handlePassword(e){
   e.preventDefault();
   let pass = e.target.value;
   this.setState({password: pass, passwordError: false});
 }
  //Handle confirm password field
  handleConfirmPassword(e){
   e.preventDefault();
   let pass = e.target.value;
   this.setState({retypedPass: pass, passwordError: false});
 }

 passwordMatched(pass1,pass2){
   if(pass1 !== pass2){
     this.setState({passwordError: true});
   }else{
    this.setState({passwordError: false});
   }
 }

 handleZipcode(e){
  let zipcode = e.target.value;
  this.setState({zipcode});  /*zipcode validation is done with html*/
 }

 validateEmail(email){
   const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
   const result = pattern.test(email);
   if(result===true){
     this.setState({
       emailError:false,
       email:email
     })
   } else{
     this.setState({
       emailError:true
     })
   }
 }

//submits the signup form
onSubmit(event){
  event.preventDefault();
  console.log("On Submit Clicked!");
  this.validateEmail(this.state.email);
  this.passwordMatched(this.state.password,this.state.retypedPass);
  const {
      firstname,
      lastname,
      email,
      password,
      zipcode
    } = this.state;
   
  const requestBody = {
       firstname,
       lastname,
       email,
       password,
       zipcode
    }
  if(!this.state.emailError && !this.state.passwordError){
       this.props.userSignUp(requestBody);
    }
}

  render(){
    return(
      <div data-test="component-login">
        {this.props.userState.loading ? <ProgressBar />: null}
         <div id="content" className="registration_form">
            <div className="form-wrapper join">
              <section className="left">
               <div className="easyclick">
                 Easy one click sign in. We won't post anything without your permission.
               </div>
               <a className="btn facebook" href="/auth/facebook">
                 <div className="track fb_button">
                   <img className="logo" src={fblogo}/> 
                 </div>
               </a>
               <a className="btn gplus" href="/auth/google_oauth2">
                  <div className="track gplus_button">
                    <img className="logo" src={googlelogo}/>
                  </div>
               </a>
               <div className="or">OR</div>
              </section>
              <section id="join-email" className="left hide">
               <header className="desktop-only">Sign up with your email:</header>
                <form onSubmit={this.onSubmit} autoComplete="off">
                 <label>
                  <input onChange={(text)=>this.handleFirstName(text)} autoCapitalize="off" autoFocus="autoFocus" placeholder="First Name" className="error" type="text" />
                 </label>
                 <label>
                   <input onChange={(text)=>this.handleLastName(text)} autoCapitalize="off" placeholder="Last Name" className="error" type="text" />
                 </label> 
                 <label>
                   <input onChange={(text)=>this.handleEmail(text)} autoCapitalize="off" placeholder="Email" className="error" type="email" />
                   {this.state.emailError ? <span className="emailError" style={{color: "red"}}>Please Enter a valid email address</span> : ''}
                 </label>
                 <label>
                   <input onChange={(e)=>this.handlePassword(e)} autoCapitalize="off" placeholder="Password" className="error" type="password" autoComplete="new-password" />
                   {this.state.passwordError ? <span className="passwordError" style={{color: "red"}}>Passwords did not match</span> : ''}
                 </label>
                 <label>
                   <input onChange={(e)=>this.handleConfirmPassword(e)} autoCapitalize="off" placeholder="Password Confirmation" className="error" type="password" autoComplete="new-password"/>
                   {this.state.passwordError ? <span className="passwordError" style={{color: "red"}}>Passwords did not match</span> : ''} 
                 </label>

                 <label>
                   <input onChange={(e)=>this.handleZipcode(e)} autoCapitalize="off" className="zip_code error" placeholder="Zip Code" type="text" pattern="\d*" maxLength="5" />
                 </label>  
                  <label className="email_opt_in"></label>
                   <input  id="checkbox" name="email_opt_in" value="true" type="checkbox"/>
                   <p>Yes! Get YP’s inside scoop on business recommendations and local events.</p>
                   <p className="helper-text">
                     By joining YP.com you agree to our
                    <a href="http://yp.com/about/legal/terms-conditions" target="_blank">Terms of Service</a>
                     and
                     <a href="http://corporate.yp.com/about/privacy-policy" target="_blank">Privacy Policy.</a>
                     We value your privacy, and will not post to your wall without your permission.
                  </p>
                  <input className="track btn yellow" value="Join YP!" type="submit" disabled={this.state.passwordError}/>
                  <p className="point-of-entry desktop-only">
                    <a className="track" href="/login">Already have an account? Sign in »</a>
                  </p>
                </form> 
              </section>
            </div>
         </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    userState: state.userState,
});

const mapDispatchToProps = dispatch => ({
    userSignUp: (requestBody) => {
      dispatch(Signup(requestBody));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);