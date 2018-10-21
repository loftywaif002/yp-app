import React, { Component} from "react";
import './style.css';
import { connect } from 'react-redux';
import store  from '../../store';
import { push } from 'connected-react-router';

class Navigation extends Component {
   constructor(props){
      super(props);
      this.routeToAboutMe = this.routeToAboutMe.bind(this);
      this.routeToEmail = this.routeToEmail.bind(this);
      this.routeToPassword = this.routeToPassword.bind(this);
   }

   routeToAboutMe(e){
      store.dispatch(push('/dashboard')); 
   }

   routeToEmail(e){
     store.dispatch(push('/updateEmail'));
   }

   routeToPassword(e){
     store.dispatch(push('/updatePassword'));
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
        <a className="nav-link" href="#">Location<span className="sr-only">(current)</span></a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
        </div>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log Out</button>
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

export default connect(mapStateToProps, null)(Navigation);