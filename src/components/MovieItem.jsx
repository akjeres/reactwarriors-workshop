import React from "react";
import ButtonMovieWillWatch from "./ButtonMovieWillWatch";

class MovieItem extends React.Component {
  state = {
    willWatch: false
  };

  render() {
    const {
      data,
      deleteMovie,
      addMovieToWillWatch,
      deleteMovieFromWillWatch
    } = this.props;
    // props.data = {};
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path ||
            data.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{data.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {data.vote_average}</p>
            <ButtonMovieWillWatch
                remove={ deleteMovieFromWillWatch.bind(null, data) }
                add={ addMovieToWillWatch.bind(null, data) }
            />
          </div>
          <button
            type="button"
            onClick={() => {
              deleteMovie(data);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default MovieItem;
