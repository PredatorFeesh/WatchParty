import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { mount, shallow } from 'enzyme';

import Header from '../Header';

describe("search field and search button rendered properly", () => {
  const container = mount(<Router><Header isLoggedIn={false} /></Router>);
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
  window.alert = jest.fn();
  const container = mount(<Router><Header isLoggedIn={false} /></Router>);
  it("empty search calls window.alert box", () => {
    container.find({ 'data-testid': 'search-button' }).at(1).simulate("click");
    expect(window.alert).toHaveBeenCalled();
  });
});

describe("functions get called", () => {
  const container = shallow(<Header.WrappedComponent
    history={{ push: jest.fn() }}
    isLoggedIn={false}
  />);

  it("non empty search results in handleSearchSubmit being called", () => {
    const handleSearchSubmitSpy = jest.spyOn(container.instance(), 'handleSearchSubmit');
    container.find({ 'data-testid': 'search-field' }).at(0).simulate('change', { target: { value: 'some movie search' } });
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    container.instance().handleSearchSubmit(event);
    expect(handleSearchSubmitSpy).toHaveBeenCalled();
  });

  it("non empty search results in handleSearchKeyUpSpy being called", () => {
    const handleSearchSubmitSpy = jest.spyOn(container.instance(), 'handleSearchSubmit');
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    container.find({ 'data-testid': 'search-field' }).at(0).simulate('keyup', { ...event, target: { value: 'some movie search' } });
    container.instance().handleSearchSubmit(event);
    expect(handleSearchSubmitSpy).toHaveBeenCalled();
  });
});
