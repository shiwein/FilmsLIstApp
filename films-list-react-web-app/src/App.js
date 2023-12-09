import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/global.css";
import { Routes, Route, Navigate } from "react-router";
import { HashRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Search from "./components/search";
import Home from "./components/home";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="ps-4 pe-4 pt-2">
          <div>
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to={"/Home"} />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
