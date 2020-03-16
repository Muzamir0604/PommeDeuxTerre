import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import CardPost from './card-post';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class ListCategory extends Component {

    render() {

        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 3, // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2, // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1, // optional, default to 1.
            },
        };
        return (
            <React.Fragment>
                <Row>
                <h3 style={{float:"left"}}>Category</h3>
                    <Col>
                    
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={2000}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    <div> <CardPost image={require('../../../assets/blog/castle.png')} /> </div>
                    <div> <CardPost image={require('../../../assets/blog/city.png')} /> </div>
                    <div> <CardPost image={require('../../../assets/blog/sunset.png')} /> </div>
                    <div> <CardPost image={require('../../../assets/blog/castle.png')} /> </div>
                </Carousel>
                </Col>
                </Row>
            </React.Fragment>

        );
    }
}


export default (ListCategory);