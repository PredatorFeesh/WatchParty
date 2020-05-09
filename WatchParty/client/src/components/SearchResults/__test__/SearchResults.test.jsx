import React from 'react';
import { shallow } from 'enzyme';

import SearchResults from '../SearchResults';

describe("rendered correctly with dummy movie data", () => {
  const dummyLocationObject = { state: { searchText: "dummySearch" } };
  const testMovieSearchResults = [
    {
      title: "movie 1", popularity: 10.0, poster_path: "/movie1", release_date: "2020-11-11", overview: "fake desc for movie 1", id: 1111,
    },
    {
      title: "movie 2", popularity: 9.0, poster_path: "/movie2", release_date: "2020-10-10", overview: "fake desc for movie 2", id: 2222,
    },
    {
      title: "movie 3", popularity: 8.0, poster_path: "/movie3", release_date: "2020-09-09", overview: "fake desc for movie 3", id: 3333,
    },
    {
      title: "movie 4", popularity: 7.0, poster_path: "/movie4", release_date: "2020-08-08", overview: "fake overview for movie 4", id: 4444,
    },
  ];
  const container = shallow(<SearchResults location={dummyLocationObject} />);
  container.setState({ movieItems: testMovieSearchResults, isLoading: false, error: null });
  it("4 movie tiles were rendered, one for each movie", () => {
    expect(container.find({ className: 'movie-item-container' }).length).toEqual(4);
  });
  describe("first movie tile container checks", () => {
    const movieTile1 = container.find({ className: 'movie-item-container' }).at(0);
    it("poster path has correct link", () => {
      expect(movieTile1.find("img").prop("src")).toEqual("https://image.tmdb.org/t/p/w1280/movie1");
    });
    it("title and release date are correct", () => {
      expect(movieTile1.find({ 'data-testid': 'movie-title-div' }).text()).toEqual("movie 1 (2020)");
    });
    it("title and release date are correct", () => {
      expect(movieTile1.find({ 'data-testid': 'movie-desc-div' }).text()).toEqual("fake desc for movie 1");
    });
    it("links to correct results link", () => {
      expect(movieTile1.find({ className: 'title-desc-container' }).find("Link").prop("to")).toEqual("/results/1111");
    });
  });
  describe("last movie tile container checks", () => {
    const movieTile4 = container.find({ className: 'movie-item-container' }).at(3);
    it("poster path has correct link", () => {
      expect(movieTile4.find("img").prop("src")).toEqual("https://image.tmdb.org/t/p/w1280/movie4");
    });
    it("title and release date are correct", () => {
      expect(movieTile4.find({ 'data-testid': 'movie-title-div' }).text()).toEqual("movie 4 (2020)");
    });
    it("title and release date are correct", () => {
      expect(movieTile4.find({ 'data-testid': 'movie-desc-div' }).text()).toEqual("fake overview for movie 4");
    });
    it("links to correct results link", () => {
      expect(movieTile4.find({ className: 'title-desc-container' }).find("Link").prop("to")).toEqual("/results/4444");
    });
  });
});

describe("empty movie search result array from IMDb api", () => {
  const dummyLocationObject = { state: { searchText: "dummySearch" } };
  const testEmptyMovieSearchResults = [];
  const container = shallow(<SearchResults location={dummyLocationObject} />);
  container.setState({ movieItems: testEmptyMovieSearchResults, isLoading: false, error: null });
  it("a non existing movie search results message to user", () => {
    expect(container.find("h3").text()).toEqual("No movie data retrieved. Try another search.");
  });
});
