import React, {Component} from "react"
import './SearchResults.css'

class SearchResults extends Component{

    constructor(props){
        super (props);

        this.state={
            movieItems: [],
            isLoading: true,
            error : null
        };

        this.fetchMovies = this.fetchMovies.bind(this);
        this.defaultPoster = this.defaultPoster.bind(this);
    }

    defaultPoster(event){
        event.target.src = "default.png"
    }

    fetchMovies() {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=bd5800f4f98c685b042cd33a1a790365&query=${this.props.location.state.searchText}`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    movieItems: data.results,
                    isLoading : false 
                })
            )
            .catch(error => this.setState({error, isLoading: false})) 
    }

    componentDidMount(){
        this.fetchMovies();
    }

    componentDidUpdate(prevProps){
        let prevSearch = prevProps.location.state.searchText;
        let newSearch = this.props.location.state.searchText;
        if (prevSearch !== newSearch) {
            this.fetchMovies();
        }
    }

    render()
    {   
        return(
            <>
            {this.state.movieItems !== undefined && this.state.movieItems.length !== 0 ? (
            <>
            <div className="search-result-text">
              <h1>Search Results for: {this.props.location.state.searchText}</h1>
            </div>
              <div className="search-tiles-container">
                {this.state.error ? <p>{this.state.error.message}</p> : null}
                {!this.state.isLoading ? (
                  <div >
                    {this.state.movieItems.map(el => (
                    <div className="movie-item-container" key={el.id}>
                      <div className="img-container">
                        <img onError={this.defaultPoster} src={`https://image.tmdb.org/t/p/w1280${el.poster_path}`} width="110px" height="190px" alt="movie poster"/>
                      </div>
                      <div className="title-desc-container">
                        <div className="movie-title">
                          {el.release_date !== undefined && el.release_date !== "" ? (<div> {el.title} ({el.release_date.substring(0,4)})</div> ) : (<div> {el.title} </div> )}
                        </div>
                          <div className="movie-desc">
                            <div> {el.overview} </div>
                          </div>
                      </div>                                         
                    </div>
                    ))}
                  </div>
                ) : (
                    <h3>Loading...</h3>
                )}    
              </div>
            </>) :
            (
            <h3>No data retrieved. Try another search.</h3>
            )
            }
            </>
        );
    }
}

export default SearchResults;