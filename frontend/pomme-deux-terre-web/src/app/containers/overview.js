import React, { Component } from "react";
import { getPostList } from "../api/post";
import { connect } from "react-redux";
import { setPost } from "../actions/postActions";

class Overview extends Component {
  componentDidMount() {
    getPostList().then(response => {
      this.props.setPost(response.data);
    });
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          {this.props.post.map(post => (
            <ul key={post.id}>{post.title}</ul>
          ))}
        </div>
        {/* <h1>{this.props.user.username}</h1> */}
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  // console.log("mapstatetoProps", state);
  return {
    post: state.postReducer.post,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPost: post => {
      dispatch(setPost(post));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
