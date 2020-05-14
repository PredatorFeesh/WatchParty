import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import theMovieDb from 'themoviedb-javascript-library';

import './SearchResults.css';

theMovieDb.common.api_key = 'bd5800f4f98c685b042cd33a1a790365';
theMovieDb.common.base_uri = 'https://api.themoviedb.org/3/';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieItems: [],
      isLoading: true,
      error: null,
    };

    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.location.state.searchText;
    const newSearch = this.props;
    if (prevSearch !== newSearch.location.state.searchText) {
      this.fetchMovies();
    }
  }

  fetchMovies() {
    const { location } = this.props;
    theMovieDb.search.getMovie(
      { query: location.state.searchText },
      (data) => {
        const response = JSON.parse(data);
        this.setState({
          movieItems: response.results,
          isLoading: false,
        });
      },
      (err) => this.setState({ movieItems: [], error: err, isLoading: false }),
    );
  }

  render() {
    const { location } = this.props;
    const { movieItems, isLoading, error } = this.state;
    return (
      <>
        {
          movieItems !== undefined &&
            movieItems.length !== 0
            ?
            (
              <>
                <div className="search-result-text">
                  <h1>
                    Search Results for: &quot;
                    {location.state.searchText}
                    &quot;
                    {' '}
                  </h1>
                </div>
                <div className="search-tiles-container">
                  {error ? <p>{error.message}</p> : null}
                  {
                    !isLoading
                      ?
                      (
                        <div>
                          {
                            movieItems.sort(
                              (a, b) => b.popularity - a.popularity,
                            ).map(
                              (el) => (
                                <div className="movie-item-container" key={el.id}>
                                  <div className="img-container">
                                    <img
                                      onError={(event) => { event.target.src = "/default.png"; }} // eslint-disable-line no-param-reassign
                                      src={`https://image.tmdb.org/t/p/w1280${el.poster_path}`}
                                      width="110"
                                      height="190"
                                      alt="movie poster"
                                    />
                                  </div>
                                  <div className="title-desc-container">
                                    <Link to={`/results/${el.id}`}>
                                      <div className="movie-title">
                                        {
                                          el.release_date !== undefined && el.release_date !== ""
                                            ? (
                                              <div data-testid="movie-title-div">
                                                {el.title}
                                                {' '}
                                                (
                                                {el.release_date.substring(0, 4)}
                                                )
                                              </div>
                                            )
                                            : (
                                              <div>
                                                {el.title}
                                              </div>
                                            )
}
                                      </div>
                                    </Link>
                                    <div className="movie-desc">
                                      <div data-testid="movie-desc-div">
                                        {el.overview}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )
                          }
                        </div>
                      )
                      :
                      (
                        <h3>Loading...</h3>
                      )
                  }
                </div>
              </>
            )
            :
            (
              <h3>No movie data retrieved. Try another search.</h3>
            )
        }
      </>
    );
  }
}

SearchResults.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      searchText: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default SearchResults;
