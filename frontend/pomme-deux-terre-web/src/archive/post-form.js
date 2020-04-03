import React, { Component } from 'react';

class PostForm extends Component {
  state = {
    editedPost: this.props.post
  }
  cancelClicked =() =>{
    this.props.cancelForm();
  }
  inputChanged  = event =>{
    let post =  this.state.editedPost;
    //There are currently title and description, refer to input and text area below.
    // console.log("name",event.target.name)
    // console.log("value",event.target.value)
    post[event.target.name] =  event.target.value;
    this.setState({editedPost: post});
  }
  saveClicked= () => {
    console.log(this.state.editedPost)
    fetch(`${process.env.REACT_APP_API_URL}/blog/posts/`,
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify(this.state.editedPost)
      }).then (resp => resp.json())
      .then(res => this.props.newPost(res))
      .catch(error => console.log(error))
  }
  updateClicked= () => {
    console.log(this.state.editedPost)
    fetch(`${process.env.REACT_APP_API_URL}/blog/posts/${this.props.post.id}/`,
      {
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify(this.state.editedPost)
      }).then (resp => resp.json())
      .then(res => this.props.editedPost(res))
      .catch(error => console.log(error))
  }


  render(){
    // const mov = this.props.post;
    const isDisabled =  this.state.editedPost.title.length === 0 ||
                        this.state.editedPost.description.length === 0;
    return (
      <React.Fragment>
        <span>Title</span><br/>
        <input type="text" name="title" value={this.props.post.title} onChange={this.inputChanged}/><br/>
        <span>Description</span><br/>
        <textarea value={this.props.post.description} name="description" onChange={this.inputChanged}/><br/>
        {
          this.props.post.id ?
          <button disabled={isDisabled} onClick={this.updateClicked}>Update</button> :
          <button onClick={this.saveClicked}>Save</button>
          }
          &nbsp;
        <button onClick={this.cancelClicked}>Cancel</button>
      </React.Fragment>)
  }
}

export default PostForm;
