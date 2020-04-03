import React, { Component } from 'react';
import ReviewStars from '../review-stars'

class PostInfo extends Component {

    render() {
        return (
            <React.Fragment>
                <h1 style={{color:"white"}}>{this.props.post.title}<p style={{ float: "right" }}><ReviewStars avg_rating={this.props.post.avg_rating} /></p></h1>
                <p>{this.props.post.description}</p>
                <p>Written by: {this.props.post.user}</p>
            </React.Fragment>

        );
    }
}

export default (PostInfo);