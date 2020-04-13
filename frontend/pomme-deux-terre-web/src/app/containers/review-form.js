import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../actions/userActions";
import { withCookies } from "react-cookie";

import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import AdsColumn from "../components/globals/ads";
import { useFormik } from "formik";
import * as Yup from "yup";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const reviewForm = (props) => {
  const dispatch = useDispatch();

  const update = (id, user) => {
    dispatch(updateUser(id, user));
    sleep(2000);
  };
  const userDetails = useSelector((state) => state.userReducer.user);

  const [user, setUser] = useState(userDetails);
  const [successFlag, setSuccessFlag] = useState(false);

  let form;

  const formik = useFormik({
    initialValues: {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      first_name: Yup.string()
        .max(35, "Must be 35 characters or less")
        .required("Required"),
      last_name: Yup.string()
        .max(20, "Must be 35 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        update(user.id, values);
        setUser(values);
        setSuccessFlag(true);
      }, 400);
    },
  });

  if (parseInt(props.match.params.id) === parseInt(user.id)) {
    form = (
      <React.Fragment>
        <Container
          style={{
            backgroundColor: "white",
            Color: "black",
            alignText: "center",
          }}
        >
          <h1>Your Profile</h1>
          {successFlag ? (
            <Alert variant={"success"}>Update Successful</Alert>
          ) : null}

          <Form onSubmit={formik.handleSubmit}>
            <Form.Row>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Username"
                />
                {formik.touched.username && formik.errors.username ? (
                  <p style={{ color: "red" }}>{formik.errors.username}</p>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} style={{ paddingLeft: "0px" }}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  onBlur={formik.handleBlur}
                  placeholder="First Name"
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <p style={{ color: "red" }}>{formik.errors.first_name}</p>
                ) : null}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  type="text"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Last Name"
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <p style={{ color: "red" }}>{formik.errors.last_name}</p>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="email"
                />

                {formik.touched.email && formik.errors.email ? (
                  <p style={{ color: "red" }}>{formik.errors.email}</p>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              {formik.dirty ? (
                <Button style={{ marginRight: "5px" }} type="submit">
                  Update
                </Button>
              ) : null}
              <p />
              {formik.dirty ? (
                <Button type="Button" style={{}} onClick={formik.handleReset}>
                  Reset
                </Button>
              ) : null}
            </Form.Row>

            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </Form>
        </Container>
      </React.Fragment>
    );
  } else {
    form = <h1>ACCESS DENIED</h1>;
  }

  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />

        <Col sm={8}>{form}</Col>

        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
};

export default withCookies(reviewForm);
