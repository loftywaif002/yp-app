import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import './style.css';

var querystring = require('querystring');
import axios from 'axios';


class SearchComponent extends Component{
	constructor(props){
		super(props);
    this.getData = this.getData.bind(this);
      this.state = {
            query: ""
         }
	}

 getData(e){
    let q = this.refs.search.value;
    console.log(q);
 }
  

	redner(){
	    return(
           <div data-test="component-search">
              <form className="form-inline my-2 my-lg-0 custom-margin">
               <input ref="search" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                 <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => { this.getData() }}>Search</button>
               </form>
           </div>
		);
	}
}

const mapStateToProps = state => ({
    userState: state.userState,
});

export default connect(mapStateToProps, null)(SearchComponent);