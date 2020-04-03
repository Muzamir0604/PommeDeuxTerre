import React, { useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import { Button } from "react-bootstrap";
import { loginApi, createUser } from "../api/user";
import { fetchUsers } from "../actions/userActions";

import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

// Use Axios
// https://designrevision.com/react-axios/
//TODO: commit files to git-dev
//TODO: install in dev, jest, mock, enzyme and react redux testing library
//TODO: implementing jest, mock and react-redux-testing library for login.js
function Login(props) {
  const dispatch = useDispatch();

  const setUser = user => {
    dispatch(fetchUsers(user));
  };
  const [state, setState] = useState({
    credentials: {
      username: "",
      password: ""
    }
  });
  const [isLoginView, setIsLoginView] = useState(true);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    if (query.get("signup")) {
      setIsLoginView(false);
    }
  }, [query]);

  const fetchUserDetails = userId => {
    if (userId > -1) {
      setUser(userId);
    }
  };
  const inputChanged = event => {
    let cred = state.credentials;
    cred[event.target.name] = event.target.value;
    setState({ credentials: cred });
  };
  const login = event => {
    if (isLoginView) {
      loginApi(state.credentials)
        .then(res => {
          console.log("loginAPI");
          props.cookies.set("mr-token", res.token);
          props.cookies.set("user-id", res.data.id);
          fetchUserDetails(res.data.id);
          props.history.push("/posts");
        })
        .catch(e => {
          console.log(e.response);
        });
    } else {
      createUser(state.credentials)
        .then(res => setIsLoginView({ isLoginView: true }))
        .catch(error => console.log(error));
    }
  };
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };
  const keyPress = event => {
    if (event.key === "Enter") {
      login();
    }
  };
  const redirected = <Redirect to="/posts" />;

  const loginSignup = (
    <div className="container">
      <h1>{isLoginView ? "Login" : "Register"}</h1>
      <span>Username</span>
      <br />
      <input
        onKeyPress={keyPress}
        type="text"
        name="username"
        value={state.credentials.username}
        onChange={inputChanged}
      />
      <br />
      <span>Password</span>
      <br />
      <input
        onKeyPress={keyPress}
        type="password"
        name="password"
        value={state.credentials.password}
        onChange={inputChanged}
      />
      <br />
      <Button variant="success" onClick={login}>
        {isLoginView ? "Login" : "Register"}
      </Button>
      <p onClick={toggleView}>
        {isLoginView ? "CreateAccount" : "back to login"}
      </p>
    </div>
  );

  let renderComponent;

  if (props.cookies.get("user-id")) {
    renderComponent = redirected;
  } else {
    renderComponent = loginSignup;
  }

  return <React.Fragment>{renderComponent}</React.Fragment>;
}

export default withCookies(Login);
