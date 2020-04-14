import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { updateUser } from "../actions/userActions";
import { withCookies } from "react-cookie";
import { Form, Button } from "react-bootstrap";

import { Field, Formik, Form as BaseForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import StarsInput from "../components/review/starsInput";
import { createUpdateReview } from "../actions/reviewActions";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submit = (
  stars,
  setStars,
  fName,
  setfName,
  description,
  setDescription,
  setSubmit,
  submit = true
) => {
  console.log(description);
  setfName(fName);
  setDescription(description);
  setSubmit(true);
  setStars(stars);
};

const SignupSchema = Yup.object().shape({
  stars: Yup.number()
    .min(0, "Too Short!")
    .max(5, "Too Long!")
    .required("Required"),
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const ReviewForm = (props) => {
  // console.log(props);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [stars, setStars] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setSubmit] = useState(false);

  const createUpdate = (id, review) => {
    console.log(id);
    dispatch(createUpdateReview(id, review));
    sleep(2000);
  };
  const handleReset = (resetForm) => {
    if (window.confirm("Reset?")) {
      resetForm();
    }
  };
  // const userReviewData = useSelector((state) => state.reviewReducer);

  return (
    <section>
      <h5>Tell us your rating</h5>
      <Formik
        onSubmit={(values) => {
          submit(
            values.stars,
            setStars,
            values.title,
            setTitle,
            values.description,
            setDescription,
            setSubmit
          );

          createUpdate(id, {
            stars: values.stars,
            title: values.title,
            description: values.description,
          });
        }}
        initialValues={{ stars: stars, title: title, description: description }}
        validationSchema={SignupSchema}
      >
        {(formProps) => (
          <BaseForm>
            <Form.Group>
              <StarsInput />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="title">Title</Form.Label>
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

      {isSubmitted && (
        <div>
          Form submitted with {stars} stars and title {title}
          and {description}
        </div>
      )}
    </section>
  );
};

export default ReviewForm;

// const ReviewForm = (props) => {
//   const dispatch = useDispatch();

//   const createUpdate = (id, review) => {
//     dispatch(createUpdate(id, review));
//     sleep(2000);
//   };
//   const userReviewData = useSelector((state) => state.reviewReducer);
//   const auth = useSelector((state) => state.authReducer);

//   const [userReview, setUserReview] = useState(userReviewData);
//   const [successFlag, setSuccessFlag] = useState(false);

//   let form;

//   const formik = useFormik({
//     initialValues: {
//       stars: 0,
//     },
//     validationSchema: Yup.object({
//       stars: Yup.number()
//         .min(0, "Number must be at least 0")
//         .max(5, "Number must be at most 5")
//         .required("Required"),

//     onSubmit: (values) => {
//       setTimeout(() => {
//         createUpdate(auth.id, values);
//         setUserReview(values);
//         setSuccessFlag(true);
//       }, 400);
//     },
//   });
//   form = (

//   );

//   return (
//     <React.Fragment>
//       <NavBarHead />
//       <Row>
//         <AdsColumn />

//         <Col sm={8}>{form}</Col>

//         <AdsColumn />
//       </Row>
//       <PageFooter />
//     </React.Fragment>
//   );
// };

// export default withCookies(ReviewForm);
