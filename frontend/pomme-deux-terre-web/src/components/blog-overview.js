import React, { Component } from 'react';
import NavBarHead from './globals/navbar'
import AdsColumn from './globals/ads';
import PageFooter from './globals/footer';


import { withCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import PostList from './blog/post-list';




class BlogOverview extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBarHead />
        <body className="App">
          <Row>
            <AdsColumn />
            <Col sm={8}>
              <PostList />
            </Col>
            <AdsColumn />
          </Row>
        </body>
        <PageFooter />
      </React.Fragment>
    );
  }
}


export default withCookies(BlogOverview);
