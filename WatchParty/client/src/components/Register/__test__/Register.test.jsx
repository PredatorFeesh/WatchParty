import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";

import Register from '../Register';

describe("fields/buttons get rendered", () => {
  const container = shallow(<Register.WrappedComponent history={{}} />);
  it("first name field", () => {
    expect(container.find({ name: 'registerFirst' }).length).toEqual(1);
  });
  it("last name field", () => {
    expect(container.find({ name: 'registerLast' }).length).toEqual(1);
  });
  it("email field", () => {
    expect(container.find({ name: 'registerEmail' }).length).toEqual(1);
  });
  it("password field", () => {
    expect(container.find({ name: 'registerPassword' }).length).toEqual(1);
  });
  it("password confirm field", () => {
    expect(container.find({ name: 'registerPasswordConfirm' }).length).toEqual(1);
  });
  it("register button", () => {
    expect(container.find({ type: 'submit' }).text()).toEqual("Register");
  });
});

describe("entering info into field updates state", () => {
  const container = shallow(<Register.WrappedComponent history={{}} />);
  it("first name field updates", () => {
    expect(container.state('registerFirst')).toBe("");
    container.find({ name: 'registerFirst' }).simulate('change', { target: { name: 'registerFirst', value: 'test firstName' } });
    expect(container.state('registerFirst')).toBe("test firstName");
  });
  it("last name field updates", () => {
    expect(container.state('registerLast')).toBe("");
    container.find({ name: 'registerLast' }).simulate('change', { target: { name: 'registerLast', value: 'test lastName' } });
    expect(container.state('registerLast')).toBe("test lastName");
  });
  it("email field updates", () => {
    expect(container.state('registerEmail')).toBe("");
    container.find({ name: 'registerEmail' }).simulate('change', { target: { name: 'registerEmail', value: 'test email' } });
    expect(container.state('registerEmail')).toBe("test email");
  });
  it("password field updates", () => {
    expect(container.state('registerPassword')).toBe("");
    container.find({ name: 'registerPassword' }).simulate('change', { target: { name: 'registerPassword', value: 'test pass' } });
    expect(container.state('registerPassword')).toBe("test pass");
  });
  it("password confirm field updates", () => {
    expect(container.state('registerPasswordConfirm')).toBe("");
    container.find({ name: 'registerPasswordConfirm' }).simulate('change', { target: { name: 'registerPasswordConfirm', value: 'test pass' } });
    expect(container.state('registerPasswordConfirm')).toBe("test pass");
  });
});

describe("function call tests", () => {
  const container = shallow(
    <Register.WrappedComponent history={{ push: jest.fn() }} />,
  );
  it("empty fields call window alert", () => {
    window.alert = jest.fn();
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    container.instance().handleRegister(event);
    expect(window.alert).toHaveBeenCalled();
  });
  it("passwords dont match result in window alert", () => {
    container.find({ name: 'registerFirst' }).simulate('change', { target: { name: 'registerFirst', value: 'test firstName' } });
    container.find({ name: 'registerLast' }).simulate('change', { target: { name: 'registerLast', value: 'test lastName' } });
    container.find({ name: 'registerEmail' }).simulate('change', { target: { name: 'registerEmail', value: 'test email' } });
    container.find({ name: 'registerPassword' }).simulate('change', { target: { name: 'registerPassword', value: 'test pass' } });
    container.find({ name: 'registerPasswordConfirm' }).simulate('change', { target: { name: 'registerPasswordConfirm', value: 'not same pass' } });
    window.alert = jest.fn();
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    container.instance().handleRegister(event);
    expect(window.alert).toHaveBeenCalled();
  });
});

describe("function call test via button click", () => {
  const container = mount(
    <Router>
      <Register.WrappedComponent history={{ push: jest.fn() }} />
      ,
    </Router>,
  );
  const handleRegisterSpy = jest.spyOn(container.childAt(0).childAt(0).instance(), 'handleRegister');
  it("submitting form calls handleRegister function", () => {
    container.find({ name: 'registerFirst' }).at(1).simulate('change', { target: { name: 'registerFirst', value: 'test firstName' } });
    container.find({ name: 'registerLast' }).at(1).simulate('change', { target: { name: 'registerLast', value: 'test lastName' } });
    container.find({ name: 'registerEmail' }).at(1).simulate('change', { target: { name: 'registerEmail', value: 'test email' } });
    container.find({ name: 'registerPassword' }).at(1).simulate('change', { target: { name: 'registerPassword', value: 'test pass' } });
    container.find({ name: 'registerPasswordConfirm' }).at(1).simulate('change', { target: { name: 'registerPasswordConfirm', value: 'not same pass' } });
    container.find('form').at(0).simulate('submit');
    expect(handleRegisterSpy).toHaveBeenCalled();
  });
});
