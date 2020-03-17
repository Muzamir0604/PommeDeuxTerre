import React, { Component } from 'react';
import ReviewStars from '../review-stars'


class PostReview extends Component {

  render() {
    return (
      <React.Fragment>
        <h4 style={{ color: "white" }}> {this.props.review.title} <p style={{ float: "right" }}><ReviewStars avg_rating={this.props.review.avg_rating} /></p></h4>
        <span>
          <p>{this.props.review.description}</p>
          <p>By: {this.props.review.user}</p>
        </span>


      </React.Fragment>

    );
  }
}


export default (PostReview);