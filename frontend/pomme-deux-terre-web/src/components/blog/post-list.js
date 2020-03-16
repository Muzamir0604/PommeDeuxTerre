import React, { Component } from 'react';
import { withCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


import BreadCrumb from '../globals/breadcrumb'


import '../../styles/globals/breadcrumb.css'
import ListCategory from './details/list-category';

class PostList extends Component {

    render() {
        return (
            <React.Fragment>
                <Container >
                <BreadCrumb  />
                
                </Container>
                <Container>
                    <ListCategory/>
                    <ListCategory/>
                    <ListCategory/>
                    <ListCategory/>
                    <ListCategory/>
                    <ListCategory/>
                </Container>

            </React.Fragment>

        );
    }
}


export default withCookies(PostList);