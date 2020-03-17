import React, { Component } from 'react';
import { withCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row} from 'react-bootstrap';


import BreadCrumb from '../globals/breadcrumb'
import CardPost from './details/card';
import TemplateCarousel from './details/carousel'

import '../../styles/globals/breadcrumb.css'


class PostList extends Component {

    render() {
        return (
            <React.Fragment>
                <Container >
                <BreadCrumb  />
                
                </Container>
                <Container>
                <Row>
                    <h3 style={{ float: "left" }}>Category</h3>
                    <Col>
                        <TemplateCarousel item= {<CardPost image={require('../../assets/blog/castle.png')} /> } />
                    </Col>
                    <h3 style={{ float: "left" }}>Category</h3>
                    <Col>
                        <TemplateCarousel item= {<CardPost image={require('../../assets/blog/castle.png')} /> } />
                    </Col>
                    <h3 style={{ float: "left" }}>Category</h3>
                    <Col>
                        <TemplateCarousel item= {<CardPost image={require('../../assets/blog/castle.png')} /> } />
                    </Col>
                    <h3 style={{ float: "left" }}>Category</h3>
                    <Col>
                        <TemplateCarousel item= {<CardPost image={require('../../assets/blog/castle.png')} /> } />
                    </Col>
                    <h3 style={{ float: "left" }}>Category</h3>
                    <Col>
                        <TemplateCarousel item= {<CardPost image={require('../../assets/blog/castle.png')} /> } />
                    </Col>
                 
                </Row>
                </Container>
            </React.Fragment>

        );
    }
}


export default withCookies(PostList);