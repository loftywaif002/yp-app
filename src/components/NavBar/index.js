import React, { Component} from "react";
import './style.css';
import { connect } from 'react-redux';
import store  from '../../store';
import { push , replace} from 'connected-react-router';
import axios from 'axios';
var querystring = require('querystring');

import {QueryDatabase, UserLogOut} from '../../actions/userActions';

class Navigation extends Component {
   constructor(props){
      super(props);
      this.routeToAboutMe = this.routeToAboutMe.bind(this);
      this.routeToEmail = this.routeToEmail.bind(this);
      this.routeToPassword = this.routeToPassword.bind(this);
      this.routeToLocation = this.routeToLocation.bind(this);
      this.getData= this.getData.bind(this);
      this.logout = this.logout.bind(this);
      this.state = {
        query: "",
        business: [],
        success: false
      }
   }

   routeToAboutMe(e){
      store.dispatch(replace('/dashboard')); 
   }

   routeToEmail(e){
     store.dispatch(replace('/updateEmail'));
   }

   routeToPassword(e){
     store.dispatch(replace('/updatePassword'));
   }

   routeToLocation(e){
     store.dispatch(replace('/updateLocations'));
   }

   handleQuery(e){
     e.preventDefault();
     let query = e.target.value;
     this.setState({query});
   }

   getData(e){
      const requestBody = {
            query: this.state.query
          }
    this.props.businessQuery(requestBody);    
   }

   logout(e){
    console.log("Log Out Clicked");
    this.props.logout();
   }

  render() {
      if(this.props.userState.loggedIn){
        return(
           <nav className="navbar navbar-expand-lg navbar-light bg">
  <a className="navbar-brand" href="#">Yp-App</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="nav nav-pills">
      <li className="nav-item active">
        <button onClick={() => { this.routeToAboutMe() }} className="nav-link">About Me</button>
      </li>
      <li className="nav-item active">
        <button onClick={() => { this.routeToEmail() }} className="nav-link">Email</button>
      </li>
      <li className="nav-item active">
        <button onClick={() => { this.routeToPassword() }} className="nav-link">Password</button>
      </li>
      <li className="nav-item active">
        <button onClick={() => { this.routeToLocation() }} className="nav-link">Locations</button>
      </li>
       <li className="nav-item active">
         <button className="nav-link" onClick={() => { store.dispatch(replace('/results')) }}>Find Business</button>
       </li>
    </ul>
    <div className="form-inline my-2 my-lg-0 custom-margin">
       <input onChange={(e)=>this.handleQuery(e)}  className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
       <button onClick={() => { this.getData() }} className="nav-link">Search</button>
    </div>
        </div>
        <button onClick={() => { this.logout() }} className="btn btn-outline-success my-2 my-sm-0" >Log Out</button>
        </nav>
        );
      }else{
     return(
           <nav className="navbar navbar-light bg">
            <span className="navbar-brand mb-0 h1"><b>Yp-App</b></span>
           </nav>
        );
      }
  }
}

const mapStateToProps = state => ({
    userState: state.userState,
});

const mapDispatchToProps = dispatch => ({
    businessQuery: (requestBody) => {
      dispatch(QueryDatabase(requestBody));
    },
    logout: ()=>{ dispatch(UserLogOut());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);