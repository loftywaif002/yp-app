import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import {hot} from "react-hot-loader";
import './style.css';

const INITIAL_STATE = {

};

class Dashboard extends Component{
   
   constructor(props){
     super(props);
       this.state = { ...INITIAL_STATE };
   }
  render(){
    return(
       <div data-test="component-dashboard">
         <Navbar />
         <Footer />
       </div>
     );
  }
}

const mapStateToProps = state => ({
    userState: state.userState,
});

const mapDispatchToProps = dispatch => ({
    userSignUp: (email,password) => {
      dispatch(Signup(email,password));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);