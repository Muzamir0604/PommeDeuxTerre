import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Field, Formik, Form as BaseForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import StarsInput from "../components/review/starsInput";
import {
  createUpdateReview,
  getUserPostReview,
} from "../actions/reviewActions";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SignupSchema = Yup.object().shape({
  stars: Yup.number()
    .min(0, "Too Short!")
    .max(5, "Too Long!")
    .required("Required"),
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const submit = (stars, title, description, setSubmit, setState) => {
  setState({ stars: stars, title: title, description: description });
  setSubmit(true);
};

const ReviewForm = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const createUpdate = (id, review) => {
    dispatch(createUpdateReview(id, review));
    sleep(2000);
  };
  const handleReset = (resetForm) => {
    resetForm();
  };

  const [isSubmitted, setSubmit] = useState(false);
  // eslint-disablee-next-line
  const [state, setState] = useState(props.reviews);

  useEffect(() => {
    dispatch(getUserPostReview(id));
    sleep(2000);
    // eslint-disable-next-line
  }, []);

  const reviewinit = { ...props.reviews };

  return (
    <section>
      <h5>Tell us your rating</h5>
      {isSubmitted ? (
        <Alert variant={"success"}>Update Successful</Alert>
      ) : null}

      <Formik
        onSubmit={(values) => {
          submit(
            values.stars,
            values.title,
            values.description,
            setSubmit,
            setState
          );

          createUpdate(id, {
            stars: values.stars,
            title: values.title,
            description: values.description,
          });
        }}
        initialValues={reviewinit}
        validationSchema={SignupSchema}
      >
        {(formProps) => (
          <BaseForm>
            <Form.Group>
              <StarsInput />
            </Form.Group>

            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Field className="form-control" name="title" type="text" />
              <ErrorMessage name="title" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description">Description</Form.Label>
              <Field
                className="form-control"
                style={{ verticalAlign: "middle" }}
                name="description"
                type="text"
                as="textarea"
              />
              <ErrorMessage name="description" />
            </Form.Group>

            <Form.Row>
              <Button style={{ margin: "2px" }} type="submit">
                Submit
              </Button>

              <Button
                style={{ margin: "2px" }}
                type="reset"
                onClick={() => {
                  handleReset(formProps.resetForm);
                }}
              >
                Reset
              </Button>
            </Form.Row>
          </BaseForm>
        )}
      </Formik>

      <hr />
    </section>
  );
};

export default ReviewForm;
