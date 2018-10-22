import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import './style.css';

import {UpdateEmail} from '../../actions/userActions';

class EmailComponent extends Component{
    
    constructor(props){
		super(props);
		this.updateEmail = this.updateEmail.bind(this);
		this.handleConfirmEmail = this.handleConfirmEmail.bind(this);
		this.updateEmails = this.updateEmails.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.state = {
			email: this.props.userState.user[0].data.email,
			updatedEmail: this.props.userState.user[0].data.email,
			emailError: false,
			error: false,
			confirmEmail:""
		}
	}

	checkForUpdate(){
      this.setState({email: this.state.updatedEmail});
	}

	emailMatched(email1,email2){
      if(email1!== email2){
       this.setState({emailError: true});
       }else{
        this.setState({emailError: false});
      }
    }

	updateEmail(e){
       let mod_email = e.target.value;
       this.setState({updatedEmail:mod_email});
	}

   //Handle confirm password field
    handleConfirmEmail(e){
     e.preventDefault();
     let c_email = e.target.value;
     this.setState({confirmEmail: c_email});
    }

  validateEmail(email){
   const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
   const result = pattern.test(email);
   if(result===true){
     this.setState({
       error:false,
       email:email
     })
   } else{
     this.setState({
       error:true
     })
   }
 }
    
    updateEmails(event){
      this.validateEmail(this.state.updatedEmail);	
      this.emailMatched(this.state.updatedEmail,this.state.confirmEmail);
        const requestBody = {
            email:this.state.email,
            newemail:this.state.updatedEmail
          }
      if(!this.state.emailError){
        this.props.userEmailUpdate(requestBody);  
        this.checkForUpdate();
      }
    }

   render(){
    return(
       <div data-test="component-email">
            <div className="details-email simple-text-form-email">
       <div className="update_email">
          <fieldset>
           <p>To change the email address associated with this account, enter and confirm your new email address, then click Save.</p>
        <dl>
         <dt>Email address associated with this account:</dt>
         <dt>{this.state.email}</dt>
        </dl>
        <div>
          <label>New Email Address</label>
          <input onChange={(text)=>this.updateEmail(text)} type="text" maxLength="255" sfc-field-required="Enter new email" />
          {this.state.error ? <span className="emailError" style={{color: "red"}}>Please Enter a valid email address</span> : ''}
         </div>
          <div>
           <label>Confirm New Email Address</label>
           <input type="text" onChange={(text)=>this.handleConfirmEmail(text)} maxLength="255" sfc-field-required="confirm new email address" />
           {this.state.emailError ? <span className="emailError" style={{color: "red"}}>Emails did not match</span> : ''} 
          </div>
              <div className="action">
               <button type="submit" className="yellow-btn-email" onClick={this.updateEmails}>Save</button>
              </div>
         </fieldset>
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
    userEmailUpdate: (requestBody) => {
      dispatch(UpdateEmail(requestBody));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(EmailComponent);