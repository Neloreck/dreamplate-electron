import { shallow } from "enzyme";
import { Classes } from "jss";

import { createMockClasses } from "@/lib/testing";
import { HomePage } from "@/modules/main/view/pages/HomePage/HomePage.component";

describe("Home page component rendering.", () => {
  const classes: Classes = createMockClasses();

  it("Should match snapshot.", () => {
    const wrapper = shallow(<HomePage classes={classes} />);

    expect(wrapper).toMatchSnapshot("Default HOC layout.");
  });
});
