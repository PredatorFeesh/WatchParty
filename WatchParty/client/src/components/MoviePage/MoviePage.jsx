import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import theMovieDb from 'themoviedb-javascript-library';

import './MoviePage.css';

theMovieDb.common.api_key = 'bd5800f4f98c685b042cd33a1a790365';
theMovieDb.common.base_uri = 'https://api.themoviedb.org/3/';

class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieItem: [],
      trailerKey: "",
    };

    this.fetchMovieData = this.fetchMovieData.bind(this);
  }

  componentDidMount() {
    this.fetchMovieData();
  }

  fetchMovieData() {
    const { match } = this.props;
    theMovieDb.movies.getById(
      { id: match.params.movieId },
      (data) => {
        const response = JSON.parse(data);
        this.setState({ movieItem: response });
      },
      (err) => console.log(err), // eslint-disable-line no-console
    );

    theMovieDb.movies.getVideos(
      { id: match.params.movieId },
      (data) => {
        const response = JSON.parse(data);
        if (response.results.length > 0) {
          this.setState({ trailerKey: response.results[0].key });
        }
      },
      (err) => console.log(err), // eslint-disable-line no-console
    );
  }

  render() {
    const { movieItem, trailerKey } = this.state;
    return (
      <div className="info-container">
        <div className="poster-container">
          <img
            className="posters"
            data-testid="poster-img"
            onError={(event) => { event.target.src = "/default.png"; }}
            src={`https://image.tmdb.org/t/p/w1280${movieItem.poster_path}`}
            width="260"
            height="380"
            alt="movie poster"
          />
        </div>
        <div className="movie-details-container">
          <div className="title-section">
            {
              movieItem.release_date !== undefined &&
                movieItem.release_date !== ""
                ?
                (
                  <div data-testid="title-release-date-div">
                    {' '}
                    {movieItem.title}
                    {' '}
                    (
                    {movieItem.release_date.substring(0, 4)}
                    )
                  </div>
                )
                :
                (
                  <div>
                    {' '}
                    {movieItem.title}
                    {' '}
                  </div>
                )
            }
          </div>
          <div className="overview">
            Overview :
          </div>
          <div className="description">
            {movieItem.overview}
          </div>
          <div className="btn-container">
            <Button
              className="read-more-btn"
              variant="secondary"
              target="_blank"
              href={`https://www.imdb.com/title/${movieItem.imdb_id}`}
            >
              Read More
            </Button>
            {
              trailerKey !== ""
                ?
                (
                  <Button
                    className="trailer-btn"
                    variant="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  >
                    Watch Trailer
                  </Button>
                )
                :
                (null)
            }
            <Button
              className="to-watch-btn"
              variant="success"
            >
              Mark as to Watch
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

MoviePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MoviePage;
