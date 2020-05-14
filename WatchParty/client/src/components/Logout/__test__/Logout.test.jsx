import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";

import Logout from '../Logout';

describe("button renders", () => {
  const logoutFuncSpy = jest.fn();
  const container = shallow(<Logout.WrappedComponent history={{}} LogOut={logoutFuncSpy} />);
  it("logout button", () => {
    expect(container.find({ type: 'button' }).text()).toEqual("Log Out");
  });
});

describe("function call test via button click", () => {
  const logoutFuncSpy = jest.fn();
  const container = mount(
    <Router>
      <Logout.WrappedComponent history={{ push: jest.fn() }} LogOut={logoutFuncSpy} />
      ,
    </Router>,
  );
  it("logout prop function gets when button is clicked", () => {
    container.find({ type: 'button' }).at(1).simulate("click");
    expect(logoutFuncSpy).toHaveBeenCalled();
  });
});
