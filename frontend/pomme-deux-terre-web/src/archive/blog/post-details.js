import React, { Component } from 'react';
import { withCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import PostInfo from './details/post-info';
import PostReview from './details/post-review';
// import ControlledCarousel from './details/image-carousel'
import ImageItem from './details/image'
import TemplateCarousel from './details/carousel'
import BreadCrumb from '../globals/breadcrumb'

import '../../styles/blog/post-details.css'
import '../../styles/globals/breadcrumb.css'

class PostDetails extends Component {

    render() {
       
        const review ={
            title : "Batman vs Superman",
            description : "Justice League",
            avg_rating : 3,
            user : "Muzamir"

        }
        const post ={
            title : "Batman vs Superman",
            description : "Justice League",
            avg_rating : 3,
            user : "Muzamir"

        }
        return (
            <React.Fragment>
                <Container className="post-detail">
                <BreadCrumb className="post-detail" />
                <TemplateCarousel className = "image-carousel" item= {<ImageItem image={require('../../assets/blog/castle.png')} /> } />
                </Container>
                <Container className="post-detail">
                    <PostInfo post={post} />
                    <h3>Reviews</h3>
                    <PostReview review = {review} />
                    <PostReview review = {review} />
                    <PostReview review = {review} />
                    <PostReview review = {review} />
                </Container>

            </React.Fragment>

        );
    }
}


export default withCookies(PostDetails);