import React, { useState, useEffect } from "react";
import { MOVIE_GENRE_OPTIONS } from "../common/utils";
import MovieGrid from "../common/MovieGrid";
import { fetchTrendingMovies } from "../Movies/moviesClient";

const Search = () => {
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);

  const getDefaultResults = async () => {
    try {
      const results = await fetchTrendingMovies();
      setResults(results);
      console.log(results);
    } catch (error) {
      // TODO: ERROR HANDLING
    }
  };

  useEffect(() => {
    getDefaultResults();
  }, []);

  // TODO: ADD MORE FIELDS
  // TODO: CALLBACKS
  const searchForm = (
    <div className="card search-form ps-3 pe-3 pt-3 pb-3">
      <div>
        <label htmlFor="keyword" className="search-field mb-1">
          Keyword
        </label>
        <input
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          id="keyword"
          className="form-control form-control-sm"
        />
      </div>
      <div className="mt-4">
        <div className="search-field mb-1">Release Date</div>
        <div className="d-flex ms-2 justify-content-between">
          <label
            htmlFor="release-date-from"
            className="search-subfield form-label"
          >
            From
          </label>
          <input
            id="release-date-from"
            className="form-control-sm"
            type="date"
          />
        </div>
        <div className="d-flex ms-2 justify-content-between mt-1">
          <label
            className="form-label search-subfield"
            htmlFor="release-date-to"
          >
            To
          </label>
          <input id="release-date-to" className="form-control-sm" type="date" />
        </div>
        <div>
          <label htmlFor="genre" className="form-label search-field mb-1">
            Genre
          </label>
          <select className="form-select form-select-sm">
            <option selected></option>
            {Object.entries(MOVIE_GENRE_OPTIONS).map(([genre, id]) => (
              <option key={id} value={id}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-sm btn-danger btn-primary mt-2">Search</button>
    </div>
  );

  const fallbackContent = (
    <div className="d-flex justify-content-center">No Results Found</div>
  );

  // TODO: PAGINATION
  return (
    <div className="row row-col-1">
      <div className="col-12 col-md-4 mt-5">{searchForm}</div>
      <div className="col-12 col-md-8 mt-5">
        <MovieGrid
          movies={results}
          fallbackContent={fallbackContent}
          colsPerRowMd={3}
        />
      </div>
    </div>
  );
};

export default Search;
