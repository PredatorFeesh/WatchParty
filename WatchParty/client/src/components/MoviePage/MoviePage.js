import React from 'react';

import theMovieDb from 'themoviedb-javascript-library'

import './MoviePage.css'

theMovieDb.common.api_key = 'bd5800f4f98c685b042cd33a1a790365'
theMovieDb.common.base_uri = 'https://api.themoviedb.org/3/'

class MoviePage extends React.Component{

    constructor(props){
        super(props)
        
        this.state={
            movieItem: []
        }

        this.fetchMovieData = this.fetchMovieData.bind(this);
    }

    fetchMovieData(){
        console.log(this.props.match.params.movieId)

        theMovieDb.movies.getById(
            {"id": this.props.match.params.movieId }, 
            data => {
                var response = JSON.parse(data)
                this.setState({movieItem: response})
            }, 
            err => console.log(err)
        )
    }

    componentDidMount(){
        this.fetchMovieData();
    }

    render () {
        console.log(this.state.movieItem)
        return (
            <div>
              <h1> {this.state.movieItem.title} </h1>
              <img src={`https://image.tmdb.org/t/p/w1280${this.state.movieItem.poster_path}`} width="260px" height="300px"></img>
              <a href={`https://www.imdb.com/title/${this.state.movieItem.imdb_id}`}> Link </a>
            </div>
        );
    }

}

export default MoviePage;