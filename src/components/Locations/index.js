import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import './style.css';

class LocationComponent extends Component{

	constructor(props){
		super(props);
	}
   render(){
     return(
     	   <div data-test="component-location">
     	     <Navbar />
     	         <div className="details-location simple-text-form-location">
       <div className="update_location">
          <fieldset>
           <p>Personalize your YP experience by providing us with your location.</p>
         <div className="left">
          <label>Address</label>
          <input type="text" maxLength="255" sfc-field-required="Enter Address" />
          <label>City</label>
          <input type="text" maxLength="255" sfc-field-required="Enter Address" />
          <label>State</label>
          <input type="text" maxLength="255" sfc-field-required="Enter Address" />
          <label>Zipcode</label>
          <input type="text" maxLength="255" sfc-field-required="Enter Address" />
         </div>
         <div className="right">
          <label>Phone Numer</label>
           <input type="text" maxLength="255" sfc-field-required="Phone Number" />
           <label>Business Website</label>
           <input type="text" maxLength="255" sfc-field-required="Website" />
           <label>Service Area</label>
           <input type="text" maxLength="255" sfc-field-required="Service Area" />
           <label>Business Name</label>
           <input type="text" maxLength="255" sfc-field-required="Business Name" />
         </div>
              <div className="action">
               <button type="submit" className="yellow-btn-location">Save</button>
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

export default connect(mapStateToProps, null)(LocationComponent);