import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faStar } from '@fortawesome/free-solid-svg-icons'
import '../../App.css'

class ReviewStars extends Component {
    
    render(){
      return (
          <React.Fragment>
            <FontAwesomeIcon icon={faStar} className ={this.props.avg_rating > 0 ? 'orange': ''} />
            <FontAwesomeIcon icon={faStar} className ={this.props.avg_rating > 1 ? 'orange': ''}/>
            <FontAwesomeIcon icon={faStar} className ={this.props.avg_rating > 2 ? 'orange': ''}/>
            <FontAwesomeIcon icon={faStar} className ={this.props.avg_rating > 3 ? 'orange': ''}/>
            <FontAwesomeIcon icon={faStar} className ={this.props.avg_rating > 4 ? 'orange': ''}/>
          </React.Fragment>
          
          );
      }}
      
      
  export default (ReviewStars);