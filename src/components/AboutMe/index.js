import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import './style.css';
import axios from 'axios';
var querystring = require('querystring');

import {UpdateNames} from '../../actions/userActions';


class AboutMe extends Component{

	constructor(props){
		super(props);
		console.log(this.props.userState.user[0].data);
		this.updateNames = this.updateNames.bind(this);
		this.updateFirstName = this.updateFirstName.bind(this);
		this.updateLastName = this.updateLastName.bind(this);
		this.state = {
			firstname: this.props.userState.user[0].data.firstname,
			lastname: this.props.userState.user[0].data.lastname,
			email: this.props.userState.user[0].data.email,
			updatedFirstname: this.props.userState.user[0].data.firstname,
			updatedLastName: this.props.userState.user[0].data.lastname
		}
	}

	checkForUpdate(){
	 console.log("state values");
     console.log(this.state.firstname);
     console.log(this.state.lastname);
     console.log("prop values");
     console.log(this.props.userState.user[0].data.firstname);
     console.log(this.props.userState.user[0].data.lastname);
	}

	updateFirstName(e){
      let fname = e.target.value;
      this.setState({updatedFirstname:fname});
	}

	updateLastName(e){
      let lname = e.target.value;
      this.setState({updatedLastName:lname});
	}

	updateNames(event){
		console.log(this.state.email);
		console.log(this.state.updatedFirstname);
		console.log(this.state.updatedLastName);
	    const requestBody = {
            email:this.state.email,
            firstname: this.state.updatedFirstname,
            lastname: this.state.updatedLastName
          }
     this.props.userNameUpdate(requestBody);
     this.checkForUpdate();
   }
   
  render(){
    return(
       <div data-test="component-aboutme">
            <div className="details simple-text-form">
       <div className="update_user">
        <fieldset>
        <p>To make any changes, enter your new information and click Save.</p>
        <dl>
         <dt>Display name on YP:</dt>
         <dt>{this.state.firstname} {this.state.lastname}</dt>
        </dl>
        <div>
          <label>First Name</label>
          <input type="text"  onChange={(text)=>this.updateFirstName(text)} value={this.state.updatedFirstname} maxLength="255" sfc-field-required="Enter a first name" />
         </div>
          <div>
           <label>LastName</label>
           <input type="text" onChange={(text)=>this.updateLastName(text)} value={this.state.updatedLastName} maxLength="255" sfc-field-required="Enter a last name" />
          </div>
              <div className="action">
               <button type="submit" className="yellow-btn" onClick={this.updateNames}>Save</button>
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
    userNameUpdate: (requestBody) => {
      dispatch(UpdateNames(requestBody));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);