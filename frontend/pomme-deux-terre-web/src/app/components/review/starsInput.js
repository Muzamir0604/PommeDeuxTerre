import React from "react";
import Stars from "./star";
import { Field } from "formik";

const fieldName = "stars";
const StarsInput = () => (
  <Field name={fieldName} id={fieldName} type="number">
    {({ field: { value }, form: { setFieldValue } }) => (
      <div>
        <label htmlFor={fieldName} className={"label-color"}>
          Stars
        </label>
        <div>
          <Stars
            count={value}
            handleClick={(number) => setFieldValue(fieldName, number)}
          />
        </div>
      </div>
    )}
  </Field>
);

export default StarsInput;
