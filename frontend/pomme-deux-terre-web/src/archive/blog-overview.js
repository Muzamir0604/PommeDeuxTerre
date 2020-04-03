import React, { Component } from 'react';
import NavBarHead from './globals/navbar'
import AdsColumn from './globals/ads';
import PageFooter from './globals/footer';


import { withCookies } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import PostList from './blog/post-list';




class BlogOverview extends Component {
  

  state = {
    posts: [],
    token: this.props.cookies.get('mr-token'),
    categorys: [],
  }


  componentDidMount() {
    //fetch data
    if (this.state.token) {
      fetch(`${process.env.REACT_APP_API_URL}/blog/postlist/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      }).then(resp => resp.json())
        .then(res => this.setState({ posts: res }))
        .catch(error => console.log(error))
    } else {
      window.location.href = '/';
    }
  }
  render() {

    return (
      <React.Fragment>
        <NavBarHead />
        <div className="App">
          <Row>
            <AdsColumn />
            <Col sm={8}>
              <PostList posts={this.state.posts} />
            </Col>
            <AdsColumn />
          </Row>
        </div>
        <PageFooter />
      </React.Fragment>
    );
  }
}


export default withCookies(BlogOverview);
