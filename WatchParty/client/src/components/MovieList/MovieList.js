import React, { Component } from 'react'

import theMovieDb from 'themoviedb-javascript-library'

import './MovieList.css'

theMovieDb.common.api_key = 'bd5800f4f98c685b042cd33a1a790365'

const Movie = (props) => (
  <div className="row movie-list-row">
    <img
      className="col-sm movie-image"
      src={`https://image.tmdb.org/t/p/w1280${props.image}`}
      alt={`Movie poster for ${props.title}`}
    />
    <span className="col-sm movie-title">{props.title}</span>
  </div>
)

class MovieList extends Component {
  state = {
    movies: []
  }

  componentDidMount() {
    this.getMultipleMovies()
  }
  getMultipleMovies () {
    const numOfMovies = 15
    const startingId = 550

    // Create an array of integers from 550...564
    const ids = [ ...Array(numOfMovies).keys() ].map(i => startingId + i)

    // Queries TMdb for each movie id in ids
    ids.forEach(id => {theMovieDb.movies.getById(
      {id},
      (movie) => {
        this.setState({
          movies: [
            ...this.state.movies,
            JSON.parse(movie)
          ]
        })
      },
      err => {
        console.log(`Error: ${err}`)
      })
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.movies
          .sort((a, b) => {
            return a.id - b.id
          })
          .map((m, i) =>
            <Movie
              key={i}
              title={m.title}
              image={m.poster_path}
            />
          )
        }
      </div>
    )
  }
}

export default MovieList
