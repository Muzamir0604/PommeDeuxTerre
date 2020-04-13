import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../actions/userActions";
import { withCookies } from "react-cookie";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import AdsColumn from "../components/globals/ads";
import { useFormik } from "formik";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//TODO: work on Formik Star reviews
const ReviewForm = (props) => {
  const dispatch = useDispatch();

  const createUpdate = (id, review) => {
    dispatch(createUpdate(id, review));
    sleep(2000);
  };
  const userReviewData = useSelector((state) => state.reviewReducer);
  const auth = useSelector((state) => state.authReducer);

  const [userReview, setUserReview] = useState(userReviewData);
  const [successFlag, setSuccessFlag] = useState(false);

  let form;

  const formik = useFormik({
    initialValues: {
      stars: null,
      title: null,
      description: null,
    },
    validationSchema: Yup.object({
      stars: Yup.number()
        .min(0, "Number must be at least 0")
        .max(5, "Number must be at most 5")
        .required("Required"),
      title: Yup.string()
        .max(35, "Must be 35 characters or less")
        .required("Required")
        .nullable(),
      description: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required")
        .nullable(),
    }),

    onSubmit: (values) => {
      setTimeout(() => {
        createUpdate(auth.id, values);
        setUserReview(values);
        setSuccessFlag(true);
      }, 400);
    },
  });
  form = (
    <React.Fragment>
      <Container
        style={{
          backgroundColor: "white",
          Color: "black",
          alignText: "center",
        }}
      >
        <h1>Review</h1>
        {successFlag ? (
          <Alert variant={"success"}>Update Successful</Alert>
        ) : null}

        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Form.Group>
              <Form.Label>Stars</Form.Label>
              {[...Array(5)].map((e, i) => {
                console.log(i);
                return (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i >= 0 ? "orange" : ""}
                    consol
                  />
                );
              })}

              {/* <Star stars={formik.values.stars}/> */}
              {/* <Form.Control
                name="stars"
                type="text"
                value={formik.values.stars}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Stars"
              /> */}
              {formik.touched.stars && formik.errors.stars ? (
                <p style={{ color: "red" }}>{formik.errors.stars}</p>
              ) : null}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} style={{ paddingLeft: "0px" }}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
                placeholder="title"
              />
              {formik.touched.title && formik.errors.title ? (
                <p style={{ color: "red" }}>{formik.errors.title}</p>
              ) : null}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="textarea"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Description"
              />
              {formik.touched.description && formik.errors.description ? (
                <p style={{ color: "red" }}>{formik.errors.description}</p>
              ) : null}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            {formik.dirty ? (
              <Button style={{ marginRight: "5px" }} type="submit">
                Save
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

export default withCookies(ReviewForm);
