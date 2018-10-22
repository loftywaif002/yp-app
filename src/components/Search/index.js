import React, { Component} from "react";
import { connect } from 'react-redux';
import Navbar from '../NavBar';
import Footer from '../Footer';
import './style.css';




class SearchComponent extends Component{
   constructor(props){
     super(props);
     this.state = {
        resultData: [],
         flag: true
     }

   }
  
   render(){
    console.log("rendering resultData");
    if(this.state.resultData.length > 0){
      console.log(this.state.resultData[0].data);
    }
    return(
        <div data-test="component-search">
           <div className="gray">Search Results</div>
           {this.state.resultData.length > 0 ? 
            <div>
            {this.state.resultData[0].data.map((item)=>{
               return(
                  <div className="result-box">
                  <p>Business: {item.business_name}</p>
                  <p>Address: {item.address}</p>
                  <p>Service Areas: {item.service_areas}</p>
                  <p>Phone: {item.phone}</p>
                  </div>
               );
            })}
            </div>
            : 
            <div>
                 <div className="result-box">
                   <p>No results</p>
                 </div>
            </div>
          }
        </div>
      );
   }

    componentDidUpdate(){
      console.log("componentDidUpdate called");
      console.log(this.props.userState.queryFetched);
      if(this.props.userState.queryFetched && this.state.flag){
         this.setState({resultData:this.props.userState.result, flag: false});
      }
    }
}

const mapStateToProps = state => ({
    userState: state.userState,
});

export default connect(mapStateToProps, null)(SearchComponent);