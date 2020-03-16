import React, { Component } from 'react';
import { withCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import PostInfo from './details/post-info';
import PostReview from './details/post-review';
import ControlledCarousel from './details/image-carousel'
import BreadCrumb from '../globals/breadcrumb'

import '../../styles/blog/post-details.css'
import '../../styles/globals/breadcrumb.css'

class PostDetails extends Component {

    render() {
        return (
            <React.Fragment>
                <Container className="post-detail">
                <BreadCrumb className="post-detail" />
                <ControlledCarousel className="image-carousel" />
                </Container>
                <Container className="post-detail">
                    <PostInfo />
                    <h3>Reviews</h3>
                    <PostReview />
                    <PostReview />
                    <PostReview />
                    <PostReview />
                </Container>

            </React.Fragment>

        );
    }
}


export default withCookies(PostDetails);