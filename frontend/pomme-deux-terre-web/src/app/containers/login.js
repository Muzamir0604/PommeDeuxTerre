import React, { useState, useEffect } from "react";
import { withCookies, useCookies } from "react-cookie";
import NavBar from "../components/globals/navbar";

import {
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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

const useStyles = makeStyles((theme) => ({
  buttons: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  container: {
    paddingTop: "3em",
  },
}));

function Login(props) {
  const classes = useStyles();

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
          console.log(e.response.data.non_field_errors[0]);
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
      name: "",
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
    <>
      <form onSubmit={loginFormik.handleSubmit} className={classes.container}>
        <FormLabel>
          <Typography variant="h4">Login</Typography>
        </FormLabel>
        <FormGroup>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              name="email"
              type="text"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              placeholder="email"
            />
          </FormControl>
          {loginFormik.touched.email && loginFormik.errors.email ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {loginFormik.errors.email}
            </FormHelperText>
          ) : null}
        </FormGroup>
        <br />
        <FormGroup>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              type="password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              placeholder="password"
            />
          </FormControl>
          {loginFormik.touched.password && loginFormik.errors.password ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {loginFormik.errors.password}
            </FormHelperText>
          ) : null}
        </FormGroup>
        <Button
          className={classes.buttons}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>

        <Button
          className={classes.buttons}
          variant="contained"
          color="primary"
          onClick={loginFormik.handleReset}
        >
          Clear
        </Button>
        <Button
          className={classes.buttons}
          variant="contained"
          color="secondary"
          onClick={() => {
            cancelLog();
          }}
        >
          Back to Home
        </Button>
      </form>
      <br />
      <div
        href="#"
        style={{ fontSize: "16px", paddingTop: "5px" }}
        onClick={toggleView}
      >
        {isLoginView ? "CreateAccount" : "Back to login"}
      </div>
    </>
  );
  const componentSignUp = (
    <React.Fragment>
      <form onSubmit={signupFormik.handleSubmit} className={classes.container}>
        <FormLabel>
          <Typography variant="h4">Sign Up</Typography>
        </FormLabel>
        <FormGroup>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              name="name"
              type="text"
              value={signupFormik.values.name}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              placeholder="name"
            />
          </FormControl>
          {signupFormik.touched.name && signupFormik.errors.name ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {signupFormik.errors.name}
            </FormHelperText>
          ) : null}
        </FormGroup>
        <FormGroup>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              name="email"
              type="text"
              value={signupFormik.values.email}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              placeholder="email"
            />
          </FormControl>
          {signupFormik.touched.email && signupFormik.errors.email ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {signupFormik.errors.email}
            </FormHelperText>
          ) : null}
        </FormGroup>
        <FormGroup>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              type="password"
              value={signupFormik.values.password}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              placeholder="password"
            />
          </FormControl>
          {signupFormik.touched.password && signupFormik.errors.password ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {signupFormik.errors.password}
            </FormHelperText>
          ) : null}
        </FormGroup>

        <FormGroup>
          <FormControl>
            <InputLabel>Password Confirmation</InputLabel>
            <Input
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              value={signupFormik.values.passwordConfirmation}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              placeholder="password confirmation"
            />
          </FormControl>
          {signupFormik.touched.passwordConfirmation &&
          signupFormik.errors.passwordConfirmation ? (
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {signupFormik.errors.passwordConfirmation}
            </FormHelperText>
          ) : null}
        </FormGroup>
        <Button
          className={classes.buttons}
          variant="contained"
          color="primary"
          type="submit"
        >
          SignUp
        </Button>

        <Button
          className={classes.buttons}
          variant="contained"
          color="primary"
          onClick={signupFormik.handleReset}
        >
          Clear
        </Button>
        <Button
          className={classes.buttons}
          variant="contained"
          color="secondary"
          onClick={() => {
            cancelLog();
          }}
        >
          Back to Home
        </Button>
      </form>
      <br />
      <a
        href="#toggle"
        style={{ fontSize: "16px", paddingTop: "5px", font: "bold" }}
        onClick={toggleView}
      >
        {isLoginView ? "CreateAccount" : "Back to login"}
      </a>
    </React.Fragment>
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

  return (
    <React.Fragment>
      <NavBar />
      {renderComponent}
    </React.Fragment>
  );
}

export default withCookies(Login);
