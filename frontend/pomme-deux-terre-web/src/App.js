import React, { Component } from 'react';
import PostList from './components/post-list'
import PostDetails from './components/post-details'
import PostForm from './components/post-form'
import NavBarHead from './components/globals/navbar'
import AdsColumn from './components/globals/ads';
import PageFooter from './components/globals/footer';


import { withCookies } from 'react-cookie'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faFilm } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';




class App extends Component {
  posts = ['titanic', 'avatar']
  state = {
    posts: [],
    selectedPost: null,
    editedPost: null,
    token: this.props.cookies.get('mr-token')
  }
  

  componentDidMount(){
    //fetch data
    if (this.state.token){
      fetch(`${process.env.REACT_APP_API_URL}/blog/posts/`,{
        method:'GET',
        headers:{
          'Authorization': `Token ${this.state.token}`
        }
      }).then (resp => resp.json())
      .then(res => this.setState({posts:res}))
      .catch(error => console.log(error))
    }else{
      window.location.href='/';
    }

  }

  loadPost = post => {
    this.setState({selectedPost: post, editedPost: null});
  }
  postDeleted = selPost => {
    // sets the condition of the array of posts
    const posts = this.state.posts.filter(post => post.id !== selPost.id)
    this.setState({posts: posts, selectedPost: null})
  }
  editClicked = selPost => {
    this.setState({editedPost: selPost});
  }
  newPost = () => {
    this.setState({editedPost: {title:'',description: ''}});
  }
  cancelForm = () => {
    this.setState({editedPost: null});
  }
  addPost = post => {
    this.setState({posts:[...this.state.posts, post]});
  }


  render(){


  return (
    <React.Fragment>
      <NavBarHead/>
          <body className="App">
       
              <Row>
                <AdsColumn/>
                <Col sm={10}>
              <h1><FontAwesomeIcon className="icon" icon={faFilm} />&nbsp;<span>Blog</span></h1>
         
          
                <PostList posts={this.state.posts} loadPost={this.loadPost} postDeleted={this.postDeleted}
                  editClicked ={this.editClicked} newPost={this.newPost} token={this.state.token}/>
         
                { !this.state.editedPost ? (
                  <PostDetails post={this.state.selectedPost} updatePost={this.loadPost} token={this.state.token}/>
                ): <PostForm post={this.state.editedPost} cancelForm={this.cancelForm}
                newPost={this.addPost} editedPost={this.loadPost} token={this.state.token}/>}
            </Col>
              <AdsColumn/>
            </Row>
    
          </body>
  
  
          <PageFooter/>

    </React.Fragment>
  );
}}


export default withCookies(App);
