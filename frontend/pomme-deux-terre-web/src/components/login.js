import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Button } from 'react-bootstrap';


class Login extends Component{
  state ={
    credentials: {
      username:'',
      password:''
    },
    isLoginView: true
  }
  inputChanged  = event =>{
    let cred =  this.state.credentials;
    cred[event.target.name] =  event.target.value;
    this.setState({credentials: cred});
    
  }
  login = event => {
    if(this.state.isLoginView){
      console.log(this.state.credentials);
      fetch(`${process.env.REACT_APP_API_URL}/auth/`,
        { method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.credentials)
        }).then (resp => resp.json())
          .then(res => {
            this.props.cookies.set('mr-token',res.token);
            window.location.href = '/posts';
          })
          .catch(error => console.log(error))
    }else{
      fetch(`${process.env.REACT_APP_API_URL}/blog/users/`,
        { method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.credentials)
        }).then (resp => resp.json())
          .then(res => {
            this.setState({isLoginView:true});
          })
          .catch(error => console.log(error))
    }

  }
  toggleView =() => {
    this.setState({isLoginView: !this.state.isLoginView})
  }

  render (){
    return <div className= "login-container">
            <h1>
              {this.state.isLoginView ? 'Login' : 'Register'}
            </h1>
            <span>Username</span><br/>
            <input type="text" name="username" value={this.state.credentials.username}
              onChange={this.inputChanged}/><br/>
            <span>Password</span><br/>
            <input type="password" name="password" value={this.state.credentials.password}
              onChange={this.inputChanged}/><br/>
            <Button variant="success" onClick={this.login}>
              {this.state.isLoginView ? 'Login' : 'Register'}
            </Button>
            <p onClick={this.toggleView}>
                {this.state.isLoginView ? 'CreateAccount' : 'back to login'}
              </p>
          </div>
  }
}

export default withCookies(Login);
