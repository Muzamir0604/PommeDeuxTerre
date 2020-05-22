import React from "react";
import { shallow } from "enzyme";

import App from "./App";
import Overview from "./app/containers/overview";

test("renders App without error", () => {
  const wrapper = shallow(<App />);

  // expect(wrapper.find(Overview).length).toBe(1)
});
