import { expect, describe } from "@jest/globals";
import { shallow } from "enzyme";
import Wellcome from "./index";

describe("components/elements/Wellcome", () => {
  it("just checking", () => {
    const component = shallow(<Wellcome />);
    const wrapper = component.find('#wellcome');
    expect(wrapper.length).toBe(1)
  });
});
