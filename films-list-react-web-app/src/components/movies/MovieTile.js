import React from "react";
import { Link } from "react-router-dom";

const MovieTile = ({ id, title, posterUrl, releaseDate }) => {
  return (
    <Link to={`/details/${id}`} className="card movie-tile h-100">
      <img src={posterUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-text">{releaseDate}</div>
      </div>
    </Link>
  );
};

export default MovieTile;
