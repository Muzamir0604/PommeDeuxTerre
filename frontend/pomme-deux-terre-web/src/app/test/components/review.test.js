import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../utils/testUtils";
import Review from "../../components/review";

const defaultProps = {
  reviews: [
    {
      title: "ReviewTitle",
      description: "ReviewDesc",
      stars: 4,
      user: { name: "person"},
    },
  ],
};
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Review {...setupProps} />);
};

test("render without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-review");
  expect(component.length).toBe(1);
});

test("render correct number of reviews",()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-review-card")
    expect(component.length).toBe(1)
})
test("does not throw warning with expected props",()=>{
    checkProps(Review, defaultProps)
})
