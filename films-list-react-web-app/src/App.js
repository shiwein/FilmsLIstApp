import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./FilmList.css";
import { Routes, Route } from "react-router";
import { HashRouter } from "react-router-dom";
import Navigation from "./navigation";
import Movies from "./Movies";
import Search from "./Search";

//TODO
// const store = configureStore({
//   reducer: {
//     movies: moviesReducer,
//     omdb: omdbReducer,
//     likes: likesReducer,
//     users: usersReducer,
//   },
// });

function App() {
  return (
    <HashRouter>
      <div className="ps-4 pe-4 pt-2">
        <div>
          <Navigation />
          <Routes>
            {/* TODO: NAVIGATE TO THE HOME PAGE BY DEFAULT */}
            <Route path="/Home" element={<Movies />} />
            <Route path="/Search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
