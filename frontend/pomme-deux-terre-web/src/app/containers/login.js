import React, { useState, useEffect } from "react";
import { withCookies, useCookies } from "react-cookie";
import { Button, Form } from "react-bootstrap";
import { loginApi, createUser } from "../api/user";
import { fetchUsers } from "../actions/userActions";
import { setAuth } from "../actions/authActions";
import { fetchShortList } from "../actions/categoryAction";

import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { releaseUser } from "../actions/userActions";

// Use Axios
// https://designrevision.com/react-axios/

//TODO: install in dev, jest, mock, enzyme and react redux testing library
//TODO: implementing jest, mock and react-redux-testing library for login.js
//TODO: failed login message
function Login(props) {
  const dispatch = useDispatch();

  const releaseUserDispatch = () => {
    dispatch(releaseUser());
    props.cookies.remove("token", { path: "/" });
    props.cookies.remove("userId", { path: "/" });
  };
  const cancelLog = () => {
    releaseUserDispatch();
    props.history.push("/");
  };
  // eslint-disable-next-line
  const [Tcookies, setTCookie] = useCookies(["token"]);
  // eslint-disable-next-line
  const [Icookies, setICookie] = useCookies(["userId"]);

  const setUser = (user, token) => {
    dispatch(setAuth(token));
    dispatch(fetchUsers(user));
  };

  const [state, setState] = useState({
    credentials: {
      username: "",
      password: "",
    },
  });
  const [isLoginView, setIsLoginView] = useState(true);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    if (query.get("signup")) {
      toggleView();
    } // eslint-disable-next-line
    dispatch(fetchShortList());
    // eslint-disable-next-line
  }, []);

  const fetchUserDetails = (userId, token) => {
    if (userId > -1) {
      setUser(userId, token);
    }
  };
  const inputChanged = (event) => {
    let cred = state.credentials;
    cred[event.target.name] = event.target.value;
    setState({ credentials: cred });
  };
  const login = (event) => {
    if (isLoginView) {
      loginApi(state.credentials)
        .then((res) => {
          setTCookie("token", res.data.token);
          setICookie("userId", res.data.id);
          fetchUserDetails(res.data.id, res.data.token);
          props.history.push("/");
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else {
      createUser(state.credentials)
        .then((res) => setIsLoginView({ isLoginView: true }))
        .catch((error) => console.log(error));
    }
  };
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };
  const keyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  const redirected = <Redirect to="/" />;

  const loginSignup = (
    <div
      className="container"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
        paddingTop: "20px",
      }}
    >
      <h1>{isLoginView ? "Login" : "Register"}</h1>
      <Form.Label>Username</Form.Label>
      <br />
      <Form.Control
        onKeyPress={keyPress}
        type="text"
        name="username"
        value={state.credentials.username}
        onChange={inputChanged}
      />
      <br />
      <Form.Label>Password</Form.Label>
      <Form.Control
        onKeyPress={keyPress}
        type="password"
        name="password"
        value={state.credentials.password}
        onChange={inputChanged}
      />
      <br />
      <Button variant="success" onClick={login}>
        {isLoginView ? "Login" : "Register"}
      </Button>{" "}
      <Button
        variant="danger"
        onClick={() => {
          cancelLog();
        }}
      >
        Cancel
      </Button>
      <br />
      <div
        href="#"
        style={{ fontSize: "16px", paddingTop: "5px" }}
        onClick={toggleView}
      >
        {isLoginView ? "CreateAccount" : "Back to login"}
      </div>
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
