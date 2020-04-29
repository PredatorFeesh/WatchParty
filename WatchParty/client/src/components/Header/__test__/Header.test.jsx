import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from 'enzyme';

import Header from '../Header';

describe("search field and search button rendered properly", () => {
  const container = mount(<Router><Header /></Router>);
  it("rendered search field", () => {
    expect(container.find({ 'data-testid': 'search-field' })).toBeTruthy();
  });
  it("rendered search button", () => {
    expect(container.find({ 'data-testid': 'search-button' })).toBeTruthy();
  });
  it("input in search-field updates", () => {
    container.find({ 'data-testid': 'search-field' }).at(1).simulate('change', { target: { value: 'some movie search' } });
    expect(container.find({ 'data-testid': 'search-field' }).at(1).props().value).toEqual('some movie search');
  });
});

describe("functions get called", () => {
  it("empty search calls window.alert box", () => {
    window.alert = jest.fn();
    const container = mount(<Router><Header /></Router>);
    container.find({ 'data-testid': 'search-button' }).at(1).simulate("click");
    expect(window.alert).toHaveBeenCalled();
  });
});
