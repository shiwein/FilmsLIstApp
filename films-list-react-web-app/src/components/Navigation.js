import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../redux/users/userThunks";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  const screens = ["Home", "Search"];
  if (!currentUser) {
    screens.push("Login");
    screens.push("Register");
  } else {
    screens.push("Profile");
  }

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/Home");
  };

  return (
    <nav className="nav nav-tabs film-list-nav font-lg">
      {screens.map((screen) => (
        <Link
          to={`/${screen}`}
          key={`link-${screen}`}
          className={`nav-link ${pathname.includes(screen) ? "active" : ""}`}
        >
          {screen}
        </Link>
      ))}
      {currentUser && (
        // TODO: SIGN OUT
        <button className="nav-link ms-auto" onClick={handleLogout}>
          <i class="bi bi-arrow-bar-right"></i>
        </button>
      )}
    </nav>
  );
};

export default Navigation;
