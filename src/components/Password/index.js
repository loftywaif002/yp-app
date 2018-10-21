import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import './style.css';

import axios from 'axios';
var querystring = require('querystring');

class PasswordComponent extends Component{

	constructor(props){
		super(props);
		this.updatePassword = this.updatePassword.bind(this);
		this.state = {
      email: this.props.userState.user[0].data.email,
			updatedPassword: "",
			confirmPassword:"",
			passwordError: false,
			error: false,
			success: false
		}
	}
  
  //Handle Password
  handlePassword(e){
   e.preventDefault();
   let pass = e.target.value;
   this.setState({updatedPassword: pass, passwordError: false});
 }
  //Handle confirm password field
  handleConfirmPassword(e){
   e.preventDefault();
   let pass = e.target.value;
   this.setState({confirmPassword: pass, passwordError: false});
 }

 handleCurrrentPassword(e){
   e.preventDefault();
   let pass = e.target.value;
   this.setState({currentPassword: pass, passwordError: false});
 }

 passwordMatched(pass1,pass2){
   if(pass1 !== pass2){
     this.setState({passwordError: true});
   }else{
    this.setState({passwordError: false});
   }
 }


 updatePassword(event){
 	  console.log("update password clicked");
    this.passwordMatched(this.state.updatedPassword,this.state.confirmPassword);
    if(!this.state.passwordError){
      const requestBody = {
            email: this.state.email,
            newpassword:this.state.updatedPassword
          }
        //Making a PUT REQUEST
          axios({
           method: 'put',
           url: 'http://localhost:5000/updatePassword',
           data: querystring.stringify(requestBody), // you are sending body instead
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, 
           }).then((user)=>{
              console.log(user);
              this.setState({success: true});
           }).catch(error => {
              console.log(error);
        }); 
    } 
      
  }

	render(){
      return(
         <div data-test="component-password">
       <Navbar />
            <div className="details-password simple-text-form-password">
       <div className="update_password">
          <fieldset>
           <p>To change your password, enter and confirm a new password, then click Save.</p>
           {this.state.success ? <span className="success" style={{color: "green"}}>Password Updated!</span> : ''}
        <div>
          <label>New Password</label>
          <input onChange={(e)=>this.handlePassword(e)} type="text" maxLength="255" sfc-field-required="Enter new password" />
         </div>
          <div>
           <label>Confirm Password</label>
           <input onChange={(e)=>this.handleConfirmPassword(e)} type="text" maxLength="255" sfc-field-required="confirm new password" />
           {this.state.passwordError ? <span className="passwordError" style={{color: "red"}}>Passwords did not match</span> : ''}
          </div>
              <div className="action">
               <button type="submit" className="yellow-btn-password" onClick={this.updatePassword}>Save</button>
              </div>
         </fieldset>
        </div>
       </div>
         <Footer />
       </div>
      );
   }
}

const mapStateToProps = state => ({
    userState: state.userState,
});

export default connect(mapStateToProps, null)(PasswordComponent);