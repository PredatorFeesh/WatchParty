import React from 'react';
import { shallow } from 'enzyme';

import Profile from '../Profile';

describe("stuff renders", () => {
  const container = shallow(<Profile userID="some id" />);
  it("overview tab renders", () => {
    expect(container.find('TabPane').at(0).prop("eventKey")).toEqual("Overview");
  });
  it("to-watch tab renders", () => {
    expect(container.find('TabPane').at(1).prop("eventKey")).toEqual("To-watch");
  });
  it("watched tab renders", () => {
    expect(container.find('TabPane').at(2).prop("eventKey")).toEqual("Watched");
  });
  it("followers tab renders", () => {
    expect(container.find('TabPane').at(3).prop("eventKey")).toEqual("Followers");
  });
  it("following tab renders", () => {
    expect(container.find('TabPane').at(4).prop("eventKey")).toEqual("Following");
  });
});

describe("backend fetching functions were called", () => {
  const fetchUserNameSpy = jest.spyOn(Profile.prototype, "fetchUserName");
  const fetchUserDescriptionSpy = jest.spyOn(Profile.prototype, "fetchUserDescription");
  const fetchToWatchMoviesSpy = jest.spyOn(Profile.prototype, "fetchToWatchMovies");
  const fetchWatchedMovieDataSpy = jest.spyOn(Profile.prototype, "fetchWatchedMovieData");
  const fetchFollowersSpy = jest.spyOn(Profile.prototype, "fetchFollowers");
  const fetchFollowingSpy = jest.spyOn(Profile.prototype, "fetchFollowing");
  const container = shallow(<Profile userID="some id" />); // eslint-disable-line no-unused-vars
  it("username gets fetched", () => {
    expect(fetchUserNameSpy).toHaveBeenCalled();
  });
  it("user description gets fetched", () => {
    expect(fetchUserDescriptionSpy).toHaveBeenCalled();
  });
  it("user description gets fetched", () => {
    expect(fetchToWatchMoviesSpy).toHaveBeenCalled();
  });
  it("user description gets fetched", () => {
    expect(fetchWatchedMovieDataSpy).toHaveBeenCalled();
  });
  it("user description gets fetched", () => {
    expect(fetchFollowersSpy).toHaveBeenCalled();
  });
  it("user description gets fetched", () => {
    expect(fetchFollowingSpy).toHaveBeenCalled();
  });
});
