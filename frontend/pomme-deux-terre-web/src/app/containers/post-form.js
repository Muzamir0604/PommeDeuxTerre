// https://medium.com/javascript-in-plain-english/how-to-create-a-multi-step-form-with-react-hooks-53a85efdff62
import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { withCookies } from "react-cookie";

import Step1 from "../components/post-form/step1";
import Step2 from "../components/post-form/step2";
import { Container } from "react-bootstrap";

const steps = [{ id: "names" }, { id: "address" }];

const defaultData = {};

const PostForm = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };
  let content;
  switch (id) {
    case "names":
      content = <Step1 {...props} />;
      break;
    case "address":
      content = <Step2 {...props} />;
      break;
    default:
      content = null;
      break;
  }
  return (
    <React.Fragment>
      <Container>{content}</Container>
    </React.Fragment>
  );
};

export default withCookies(PostForm);
