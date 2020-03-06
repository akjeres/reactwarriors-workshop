import React from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      req: '/discover/movie',
      sort: 'popularity.desc',
    };

    console.log('constructor');
  }

  componentDidMount() {
    const { req, sort } = this.state;
    console.log('did mount');
    fetch(`${API_URL}${req}?api_key=${API_KEY_3}&sort_by=${sort}`)
        .then(res => {
            if (!res.ok) throw new Error(`"${req}" method was not found. Status ${res.status}.`);
            console.log(res);
            return res.json();
        })
        .then(res => {
            this.setState({
                movies: res.results
            });
        })
        .catch(e => {
            console.error(e.message);
            this.setState({
                movies: []
            });
        });
  };

  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  render() {
    console.log("render");
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row">
              {this.state.movies.map(movie => {
                if (!('id' in movie)) return null;
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
