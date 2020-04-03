import React, { Component } from "react";
import { withCookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import BreadCrumb from "../globals/breadcrumb";

import "../../styles/globals/breadcrumb.css";
import "../../styles/blog/post-list.css";
import CardCarousel from "./details/card-carousel";

class PostList extends Component {
  render() {
    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, []); // empty object is the initial value for result object
    };
    const result = groupBy(this.props.posts, "category");

    return (
      <React.Fragment>
        <Container>
          <BreadCrumb />
        </Container>
        <Container>
          {/* {console.log(result)} */}
          {result.map(title => {
            console.log("hello", title);
          })}
          {/* <CardCarousel post={result} /> */}
          {/* {this.state.results.map((e, i) => {
            return <CardCarousel post={e} />;
          })} */}
        </Container>
      </React.Fragment>
    );
  }
}

export default withCookies(PostList);
