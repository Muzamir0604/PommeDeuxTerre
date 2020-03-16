import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faStar } from '@fortawesome/free-solid-svg-icons'

class ReviewStars extends Component {
    
    render(){
      return (
          <React.Fragment>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </React.Fragment>
          
          );
      }}
      
      
  export default (ReviewStars);