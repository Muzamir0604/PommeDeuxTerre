import React, { Component } from 'react';
import ReviewStars from '../review-stars'


class PostReview extends Component {

  render() {
    return (
      <React.Fragment>
        <h4 style={{ color: "orange" }}>Title goes here <p style={{ float: "right" }}><ReviewStars /></p></h4>
        <span>
          <p>Lorep ipsum what ever you think of  goes here then
          Lorep ipsum what ever you think of  goes here then
          Lorep ipsum what ever you think of  goes here then
          Lorep ipsum what ever you think of  goes here then
          Lorep ipsum what ever you think of  goes here then
             </p>
          <p>THE USER</p>
        </span>


      </React.Fragment>

    );
  }
}


export default (PostReview);