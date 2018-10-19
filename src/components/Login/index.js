import React, { Component} from "react";

import Navbar from '../NavBar';
import Footer from '../Footer';

class Login extends Component{
  render(){
    return(
      <div data-test="component-login">
        <Navbar />
        <Footer />
      </div>
    );
  }
}

export default Login;