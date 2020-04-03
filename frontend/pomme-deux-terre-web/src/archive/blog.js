import React, { Component } from 'react';
import NavBarHead from './globals/navbar'
import AdsColumn from './globals/ads';
import PageFooter from './globals/footer';


import { withCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import PostDetails from './blog/post-details';




class Blog extends Component {
 
  state = {
    posts: [],
    selectedPost: null,
    editedPost: null,
    token: this.props.cookies.get('mr-token')
  }


  componentDidMount() {
    //fetch data
    if (this.state.token) {
      fetch(`${process.env.REACT_APP_API_URL}/blog/posts/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      }).then(resp => resp.json())
        .then(res => this.setState({ posts: res }))
        .catch(error => console.log(error))
    } else {
      window.location.href = '/';
  }}

    render() {
      return (
        <React.Fragment>
          <NavBarHead />
          <div className="App">
            <Row>
              <AdsColumn />
              <Col sm={8}>
                <PostDetails />
              </Col>
              <AdsColumn />
            </Row>
          </div>
          <PageFooter />
        </React.Fragment>
      );
    }
  }



  export default withCookies(Blog);
