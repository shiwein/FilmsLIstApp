import React, { useState, useEffect } from "react";
import {
  MOVIE_GENRE_OPTIONS,
  LANGUAGES,
  filterEmptyParams,
} from "../../utils/utils";
import MovieGrid from "../movies/MovieGrid";
import { searchMovies } from "../../services/movieService";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();

  // const [searchParams, setSearchParams] = useState({});
  // Initialize searchParams as an object from URLSearchParams
  const initialSearchParams = {};
  query.forEach((value, key) => {
    initialSearchParams[key] = value;
  });
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      // Construct query string and navigate
      const searchQuery = new URLSearchParams(
        filterEmptyParams(searchParams)
      ).toString();
      navigate(`?${searchQuery}`);
      const results = await searchMovies(searchParams);
      setResults(results);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      console.error("Error fetching movies:", err);
    }
  };

  const handleInputChange = (event) => {
    const newSearchParams = {
      ...searchParams,
      [event.target.name]: event.target.value,
    };
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    handleSearch();
  }, []); // Empty dependency array ensures this runs once on mount

  // TODO: ADD MORE FIELDS
  // TODO: CALLBACKS
  const searchForm = (
    <div className="card search-form ps-3 pe-3 pt-3 pb-3">
      <div>
        <label htmlFor="keyword" className="search-field mb-1">
          Keyword
        </label>
        <input
          value={searchParams.with_keywords}
          name="with_keywords"
          onChange={handleInputChange}
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
            name="primary_release_date.gte"
            onChange={handleInputChange}
            value={searchParams["primary_release_date.gte"]}
          />
        </div>
        <div className="d-flex ms-2 justify-content-between mt-1">
          <label
            className="form-label search-subfield"
            htmlFor="release-date-to"
          >
            To
          </label>
          <input
            id="release-date-to"
            className="form-control-sm"
            type="date"
            name="primary_release_date.lte"
            onChange={handleInputChange}
            value={searchParams["primary_release_date.lte"]}
          />
        </div>
        <div>
          <label htmlFor="genre" className="form-label search-field mb-1">
            Genre
          </label>
          <select
            id="genre"
            className="form-select form-select-sm"
            name="with_genres"
            value={searchParams.with_genres}
            onChange={handleInputChange}
          >
            <option selected></option>
            {Object.entries(MOVIE_GENRE_OPTIONS).map(([genre, id]) => (
              <option key={id} value={id}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="language" className="form-label search-field mb-1">
            Language Option
          </label>
          <select
            id="language"
            className="form-select form-select-sm"
            name="language"
            value={searchParams.language}
            onChange={handleInputChange}
          >
            <option selected></option>
            {LANGUAGES.map((language) => (
              <option key={language.iso_639_1} value={language.iso_639_1}>
                {language.english_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="btn btn-sm btn-danger btn-primary mt-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );

  const fallbackContent = (
    <h2 className="d-flex justify-content-center font-color-primary">
      Sorry, we couldn't find any results ( • ᴖ • ｡)
    </h2>
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
