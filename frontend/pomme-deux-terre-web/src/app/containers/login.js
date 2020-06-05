import React, { useState, useEffect } from "react";
import { withCookies, useCookies } from "react-cookie";
import { Button, Form, Container } from "react-bootstrap";
import { loginApi, createUser } from "../api/user";
import { fetchUsers } from "../actions/userActions";
import { setAuth } from "../actions/authActions";
import { fetchShortList } from "../actions/categoryAction";

import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { releaseUser } from "../actions/userActions";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  //eslint-disable-next-line
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
      dispatch(setAuth(token));
      dispatch(fetchUsers(userId));
    }
  };
  const login = () => {
    if (isLoginView) {
      loginApi(loginFormik.values)
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
      createUser({
        name: signupFormik.values.name,
        email: signupFormik.values.email,
        password: signupFormik.values.password,
      })
        .then((res) => setIsLoginView({ isLoginView: true }))
        .catch((error) => console.log(error));
    }
  };
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Require your email"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        login();
      }, 400);
    },
  });
  const signupFormik = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Require your email"),
      password: Yup.string().required("Password is required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        login();
      }, 400);
    },
  });
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const redirected = <Redirect to="/" />;
  const componentLogin = (
    <Container
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
        paddingTop: "20px",
      }}
    >
      <h1>Login</h1>

      <Form onSubmit={loginFormik.handleSubmit}>
        <Form.Row>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              placeholder="email"
            />
            {loginFormik.touched.email && loginFormik.errors.email ? (
              <p style={{ color: "red" }}>{loginFormik.errors.email}</p>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              placeholder="password"
            />
            {loginFormik.touched.password && loginFormik.errors.password ? (
              <p style={{ color: "red" }}>{loginFormik.errors.password}</p>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button style={{ marginRight: "5px" }} type="submit">
            Login
          </Button>

          <Button type="Button" style={{}} onClick={loginFormik.handleReset}>
            Clear
          </Button>
          <Button
            style={{ marginLeft: "4px" }}
            variant="danger"
            onClick={() => {
              cancelLog();
            }}
          >
            Back to Home
          </Button>
        </Form.Row>
      </Form>
      <br />
      <div
        href="#"
        style={{ fontSize: "16px", paddingTop: "5px" }}
        onClick={toggleView}
      >
        {isLoginView ? "CreateAccount" : "Back to login"}
      </div>
    </Container>
  );
  const componentSignUp = (
    <Container
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
        paddingTop: "20px",
      }}
    >
      <h1>SignUp</h1>

      <Form onSubmit={signupFormik.handleSubmit}>
      <Form.Row>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={signupFormik.values.name}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  placeholder="name"
                />
                {signupFormik.touched.name && signupFormik.errors.name ? (
                  <p style={{ color: "red" }}>{signupFormik.errors.name}</p>
                ) : null}
              </Form.Group>
            </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              value={signupFormik.values.email}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              placeholder="email"
            />
            {signupFormik.touched.email && signupFormik.errors.email ? (
              <p style={{ color: "red" }}>{signupFormik.errors.email}</p>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={signupFormik.values.password}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              placeholder="password"
            />
            {signupFormik.touched.password && signupFormik.errors.password ? (
              <p style={{ color: "red" }}>{signupFormik.errors.password}</p>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              value={signupFormik.values.passwordConfirmation}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              placeholder="password confirmation"
            />
            {signupFormik.touched.passwordConfirmation &&
            signupFormik.errors.passwordConfirmation ? (
              <p style={{ color: "red" }}>
                {signupFormik.errors.passwordConfirmation}
              </p>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button style={{ marginRight: "5px" }} type="submit">
            SignUp
          </Button>

          <Button type="Button" style={{}} onClick={signupFormik.handleReset}>
            Clear
          </Button>
          <Button
            style={{ marginLeft: "4px" }}
            variant="danger"
            onClick={() => {
              cancelLog();
            }}
          >
            Back to Home
          </Button>
        </Form.Row>
      </Form>
      <br />
      <div
        href="#"
        style={{ fontSize: "16px", paddingTop: "5px" }}
        onClick={toggleView}
      >
        {isLoginView ? "CreateAccount" : "Back to login"}
      </div>
    </Container>
  );

  let revisedLoginSignUp;
  if (isLoginView) {
    revisedLoginSignUp = <React.Fragment>{componentLogin}</React.Fragment>;
  } else {
    revisedLoginSignUp = <React.Fragment>{componentSignUp}</React.Fragment>;
  }

  let renderComponent;

  if (props.cookies.get("user-id")) {
    renderComponent = redirected;
  } else {
    renderComponent = revisedLoginSignUp;
  }

  return <React.Fragment>{renderComponent}</React.Fragment>;
}

export default withCookies(Login);
