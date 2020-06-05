import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../utils/testUtils";
import Tags from "./tag";

const defaultProps = { tags: [{ name: "hello" }], count: 1 };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Tags {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-tags");
  expect(component.length).toBe(1);
});
test("does not throw warning with expected props", () => {
    const expectedProps = { tags: [{ name: "hello" },{name:"nuts"}], count: 2 };
    checkProps(Tags, expectedProps);
  });