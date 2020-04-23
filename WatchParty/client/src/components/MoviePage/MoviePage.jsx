import React from 'react';
import { Button } from 'react-bootstrap';

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
    this.defaultPoster = this.defaultPoster.bind(this);
  }

  componentDidMount() {
    this.fetchMovieData();
  }

  defaultPoster = (event) => { event.target.src = "/default.png"; }

  fetchMovieData() {
    const { params } = this.props.match;
    theMovieDb.movies.getById(
      { id: params.movieId },
      (data) => {
        const response = JSON.parse(data);
        this.setState({ movieItem: response });
      },
      (err) => console.log(err),
    );

    theMovieDb.movies.getVideos(
      { id: params.movieId },
      (data) => {
        const response = JSON.parse(data);
        if (response.results.length > 0) {
          this.setState({ trailerKey: response.results[0].key });
        }
      },
      (err) => console.log(err),
    );
  }

  render() {
    const { movieItem, trailerKey } = this.state;
    return (
      <div className="info-container">
        <div className="poster-container">
          <img
            onError={this.defaultPoster}
            src={`https://image.tmdb.org/t/p/w1280${movieItem.poster_path}`}
            width="260px"
            height="380px"
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
                  <div>
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

export default MoviePage;
