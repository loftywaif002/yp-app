import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import './style.css';

var querystring = require('querystring');
import axios from 'axios';

class LocationComponent extends Component{

	constructor(props){
		super(props);
    this.updateLocation = this.updateLocation.bind(this);
      this.state = {
          email: this.props.userState.user[0].data.email,
          address: "",
          city: "",
          state:"",
          zipcode: "",
          phone: "",
          website:"",
          serviceArea:"",
          businessName:"",
          error: false,
          success: false
      }
	  }
    handleAddress(e){
       e.preventDefault();
       let addr = e.target.value;
       this.setState({address: addr});
    }
    handleCity(e){
       e.preventDefault();
       let city = e.target.value;
       this.setState({city: city}); 
     }
    handleState(e){
        e.preventDefault();
        let state = e.target.value;
        this.setState({state: state}); 
     }
    handleZipcode(e){
        e.preventDefault();
        let zip = e.target.value;
        this.setState({zipcode: zip});
     }
    handlePhone(e){
         e.preventDefault();
         let phoneNumber = e.target.value;
         this.setState({phone: phoneNumber});
    }
    handleWebsite(e){
         e.preventDefault();
         let web = e.target.value;
         this.setState({website: web});
    }
    handleArea(e){
         e.preventDefault();
         let area = e.target.value;
         this.setState({serviceArea: area});
    }
    handleBusinessName(e){
         e.preventDefault();
         let name = e.target.value;
         this.setState({businessName: name});
    }
    updateLocation(event){
         const requestBody = {
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            phone: this.state.phone,
            website: this.state.website,
            serviceArea: this.state.serviceArea,
            businessName: this.state.businessName
          }
       //Making a PUT REQUEST
          axios({
           method: 'put',
           url: 'http://localhost:5000/updateLocation',
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
   render(){
     return(
     	   <div data-test="component-location">
     	         <div className="details-location simple-text-form-location">
       <div className="update_location">
          <fieldset>
           {this.state.success ? <span className="success" style={{color: "green"}}>Business Profile Updated!</span> : ''} 
           <p>Personalize your YP experience by providing us with your location.</p>
         <div className="left">
          <label>Address</label>
          <input onChange={(e)=>this.handleAddress(e)} type="text" maxLength="255" sfc-field-required="Enter Address" />
          <label>City</label>
          <input onChange={(e)=>this.handleCity(e)} type="text" maxLength="255" sfc-field-required="Enter City" />
          <label>State</label>
          <input onChange={(e)=>this.handleState(e)} type="text" maxLength="255" sfc-field-required="Enter State" />
          <label>Zipcode</label>
          <input onChange={(e)=>this.handleZipcode(e)} type="text" maxLength="5" sfc-field-required="Enter Zipcode" />
         </div>
         <div className="right">
          <label>Phone Numer</label>
           <input onChange={(e)=>this.handlePhone(e)} type="text" maxLength="9" sfc-field-required="Phone Number" />
           <label>Business Website</label>
           <input onChange={(e)=>this.handleWebsite(e)} type="text" maxLength="255" sfc-field-required="Website" />
           <label>Service Area</label>
           <input onChange={(e)=>this.handleArea(e)} type="text" maxLength="255" sfc-field-required="Service Area" />
           <label>Business Name</label>
           <input onChange={(e)=>this.handleBusinessName(e)} type="text" maxLength="255" sfc-field-required="Business Name" />
         </div>
              <div className="action">

               <button type="submit" className="yellow-btn-location" onClick={this.updateLocation}>Save</button>
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

export default connect(mapStateToProps, null)(LocationComponent);