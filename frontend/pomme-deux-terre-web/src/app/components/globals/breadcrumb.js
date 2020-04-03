import Breadcrumb from 'react-bootstrap/Breadcrumb'
import React, { Component } from 'react';
import { withCookies } from 'react-cookie';


class BreadCrumbs extends Component {

  render() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>

    );
  }
}


export default withCookies(BreadCrumbs);