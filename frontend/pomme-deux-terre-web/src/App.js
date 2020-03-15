import React, { Component } from 'react';
import PostList from './components/post-list'
import PostDetails from './components/post-details'
import PostForm from './components/post-form'
import { withCookies } from 'react-cookie'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { faFilm } from '@fortawesome/free-solid-svg-icons'
// import { useMediaQuery } from 'react-responsive'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown,
  Container, Col, Row
} from 'react-bootstrap';
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
  
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Pomme Deux Terre</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  
        <header className="App-header App">
          Header Here
          </header>
          <body className="App">
            <Container>
              <Row>
                <Col className="App" sm={2}>
                This is here for a reasons 
                This is here for a reasons
                This is here for a reasons
                This is here for a reasons
                This is here for a reasons
                This is here for a reasons
                </Col>
                <Col sm={8}>
              <h1><FontAwesomeIcon className="icon" icon={faFilm} />&nbsp;<span>Blog</span></h1>
         
          
                <PostList posts={this.state.posts} loadPost={this.loadPost} postDeleted={this.postDeleted}
                  editClicked ={this.editClicked} newPost={this.newPost} token={this.state.token}/>
         
                { !this.state.editedPost ? (
                  <PostDetails post={this.state.selectedPost} updatePost={this.loadPost} token={this.state.token}/>
                ): <PostForm post={this.state.editedPost} cancelForm={this.cancelForm}
                newPost={this.addPost} editedPost={this.loadPost} token={this.state.token}/>}
           
            </Col>
            <Col className="App" sm={2}>This is here for a reasons 
            This is here for a reasons
            This is here for a reasons
            This is here for a reasons
            This is here for a reasons
            This is here for a reasons
            This is here for a reasons
            </Col>
            </Row>
            </Container>
          </body>
          <footer className="App" >Footer here</footer>

    </React.Fragment>
  );
}}


export default withCookies(App);
