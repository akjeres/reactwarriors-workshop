import React from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";
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
      page: 1,
      total: null,
    };
  }

  getMovies(obj) {
      const { req, sort, page } = obj;

      fetch(`${API_URL}${req}?api_key=${API_KEY_3}&sort_by=${sort}&page=${page}`)
          .then(res => {
              if (!res.ok) throw new Error(`"${req}" method was not found. Status ${res.status}.`);
              return res.json();
          })
          .then(res => {
              this.setState({
                  movies: res.results,
                  page: res.page,
                  total: res.total_pages,
              });
          })
          .catch(e => {
              console.error(e.message);
              this.setState({
                  movies: [],
                  page: 1,
                  total: null,
              });
          });
  };

  componentDidMount() {
    this.getMovies(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
      if (!(
              prevState.sort === this.state.sort
              && prevState.page === this.state.page
          )) {
          this.getMovies(this.state);
      }
  };

  deleteMovie = movie => {
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

  updateSort = value => {
    this.setState({
        sort: value,
    });
  };

  updatePage = value => {
      this.setState({
          page: value,
      });
  };

  render() {
    const {
        sort,
        movies,
        moviesWillWatch,
        page,
        total
    } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
                <div className="col-12">
                    <MovieTabs
                        sort={ sort }
                        updateSort={ this.updateSort }
                    />
                </div>
            </div>
            <div className="row">
              {movies.map(movie => {
                if (!('id' in movie)) return null;
                return (
                  <div className="col-6 mb-4" key={ movie.id }>
                    <MovieItem
                      data={ movie }
                      deleteMovie={ this.deleteMovie }
                      addMovieToWillWatch={ this.addMovieToWillWatch }
                      deleteMovieFromWillWatch={ this.deleteMovieFromWillWatch }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: { moviesWillWatch.length } movies</h4>
            <ul className="list-group">
              { moviesWillWatch.map(movie => (
                <li key={ movie.id } className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{ movie.title }</p>
                    <p>{ movie.vote_average }</p>
                  </div>
                </li>
              )) }
            </ul>
          </div>
        </div>
        <div className="row">
            <div className="col-9">
                <Pagination
                    page={ page }
                    updatePage={ this.updatePage }
                    total={ total }
                />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
