import React from 'react';
import { shallow } from 'enzyme';

import MoviePage from '../MoviePage';

describe("rendered correctly with dummy movieItem and trailerKey", () => {
  const testMovieItem = {
    poster_path: "/test.jpg",
    release_date: "2020-11-11",
    title: "test movie",
    overview: "test description for test movie",
    imdb_id: "tt1234",
  };
  const testTrailerKey = "abc";
  const match = {
    params: { movieId: '1234' }, isExact: true, path: "", url: "",
  };
  const fetchMovieFn = jest.fn(match);
  const container = shallow(<MoviePage match={match} fetchMovieData={fetchMovieFn} />);
  container.setState({ movieItem: testMovieItem, trailerKey: testTrailerKey });
  it("movie poster has correct link", () => {
    expect(container.find({ 'data-testid': 'poster-img' }).prop("src")).toEqual("https://image.tmdb.org/t/p/w1280/test.jpg");
  });
  it("title and release date are correct", () => {
    expect(container.find({ 'data-testid': 'title-release-date-div' }).text()).toEqual(" test movie (2020)");
  });
  it("overview is correct", () => {
    expect(container.find({ className: 'description' }).text()).toEqual("test description for test movie");
  });
  it("read more button links to imdb", () => {
    expect(container.find({ className: 'read-more-btn' }).at(0).prop("href")).toEqual("https://www.imdb.com/title/tt1234");
  });
  it("watch trailer button links to youtube video", () => {
    expect(container.find({ className: 'trailer-btn' }).at(0).prop("href")).toEqual("https://www.youtube.com/watch?v=abc");
  });
  it("mark as to watch button renders", () => {
    expect(container.find({ className: 'to-watch-btn' })).toBeTruthy();
  });
});

it("ensure fetchMovieData gets called on when component mounts", () => {
  const testMatch = {
    params: { movieId: '1234' }, isExact: true, path: "", url: "",
  };
  const fetchMovieSpy = jest.spyOn(MoviePage.prototype, "fetchMovieData");
  shallow(<MoviePage match={testMatch} movieId="1234" />);
  expect(fetchMovieSpy).toHaveBeenCalled();
});
