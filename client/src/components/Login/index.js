import React, { Component} from "react";

import Navbar from '../NavBar';
import Footer from '../Footer';

import {hot} from "react-hot-loader";
import './style.css';

import fblogo from '../../assets/fb-logo.png';
import googlelogo from '../../assets/google_plus.png';

class Login extends Component{
  constructor(props){
   super(props);
   this.state = {
     data: null
    }
  }

  componentDidMount() {
    //fetch data here
  }


  render(){
    return(
      <div data-test="component-login">
        <Navbar />
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
                <form autocomplete="off">
                 <label>
                  <input autocapitalize="off" autofocus="autofocus" placeholder="First Name" class="error" type="text" />
                 </label>
                 <label>
                   <input autocapitalize="off" placeholder="Last Name" class="error" type="text" />
                 </label> 
                 <label>
                   <input autocapitalize="off" placeholder="Email" class="error" type="text" />
                 </label>
                 <label>
                   <input autocapitalize="off" placeholder="Password" class="error" type="password" />
                 </label>
                 <label>
                   <input autocapitalize="off" placeholder="Password Confirmation" class="error" type="password" />
                 </label>
                 <label>
                   <input autocapitalize="off" class="zip_code error" placeholder="Zip Code" type="text" />
                 </label>  
                  <label className="email_opt_in"></label>
                   <input checked="" id="checkbox" name="email_opt_in" value="true" type="checkbox"/>
                   <p>Yes! Get YP’s inside scoop on business recommendations and local events.</p>
                   <p class="helper-text">
                     By joining YP.com you agree to our
                    <a href="http://yp.com/about/legal/terms-conditions" target="_blank">Terms of Service</a>
                     and
                     <a href="http://corporate.yp.com/about/privacy-policy" target="_blank">Privacy Policy.</a>
                     We value your privacy, and will not post to your wall without your permission.
                  </p>
                  <input className="track btn yellow" value="Join YP!" type="submit" />
                  <p className="point-of-entry desktop-only">
                    <a className="track" href="/login">Already have an account? Sign in »</a>
                  </p>
                </form> 
              </section>
            </div>
         </div>
        <Footer />
      </div>
    );
  }
}

export default hot(module)(Login);