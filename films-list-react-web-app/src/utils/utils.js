import languages from "./languages.json";

export const TMDB_POSTER_URL_PREFIX = "https://image.tmdb.org/t/p/w500";

export const MOVIE_GENRE_OPTIONS = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export const LANGUAGES = languages;

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const isoToLanguageName = (isoCode) => {
  const language = languages.find((lang) => lang.iso_639_1 === isoCode);
  return language ? language.english_name : null;
};

export const languageNameToIso = (languageName) => {
  const language = languages.find((lang) => lang.english_name === languageName);
  return language ? language.iso_639_1 : null;
};

export const filterEmptyParams = (params) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
