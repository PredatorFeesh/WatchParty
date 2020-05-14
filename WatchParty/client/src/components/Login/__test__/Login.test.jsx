import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Login';

describe("fields/buttons get rendered", () => {
  const container = shallow(<Login.WrappedComponent history={{}} LogIn={jest.fn()} />);
  it("email field renders", () => {
    expect(container.find({ placeholder: 'Enter email' }).length).toEqual(1);
  });
  it("password field renders", () => {
    expect(container.find({ placeholder: 'Password' }).length).toEqual(1);
  });
  it("login button renders", () => {
    expect(container.find({ 'data-testid': 'login-btn' }).length).toEqual(1);
  });
});

describe("entering info into field updates state", () => {
  const container = shallow(<Login.WrappedComponent history={{}} LogIn={jest.fn()} />);
  it("email field updates", () => {
    expect(container.state('loginEmail')).toBe("");
    container.find({ placeholder: 'Enter email' }).simulate('change', { target: { name: 'loginEmail', value: 'test@gmail.com' } });
    expect(container.state('loginEmail')).toBe("test@gmail.com");
  });
  it("password field updates", () => {
    expect(container.state('loginPassword')).toBe("");
    container.find({ placeholder: 'Password' }).simulate('change', { target: { name: 'loginPassword', value: 'testpassword' } });
    expect(container.state('loginPassword')).toBe("testpassword");
  });
});

describe("function call tests", () => {
  const loginFuncSpy = jest.fn();
  const container = shallow(
    <Login.WrappedComponent history={{ push: jest.fn() }} LogIn={loginFuncSpy} />,
  );
  it("empty fields call window alert", () => {
    window.alert = jest.fn();
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    container.instance().handleLogin(event);
    expect(window.alert).toHaveBeenCalled();
  });
  it("valid fields call login prop function", () => {
    container.find({ placeholder: 'Enter email' }).simulate('change', { target: { name: 'loginEmail', value: 'test@gmail.com' } });
    container.find({ placeholder: 'Password' }).simulate('change', { target: { name: 'loginPassword', value: 'testpassword' } });
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    container.instance().handleLogin(event);
    expect(loginFuncSpy).toHaveBeenCalled();
  });
});
