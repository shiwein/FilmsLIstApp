import { Link } from "react-router-dom";
import { useLocation } from "react-router";
//import { useSelector } from "react-redux";

const Navigation = () => {
  // TODO: FETCH CURRENT USER
  //const { currentUser } = useSelector((state) => state.users);
  const currentUser = undefined;

  const { pathname } = useLocation();

  const screens = ["Home", "Search"];
  if (!currentUser) {
    screens.push("Login");
    screens.push("Register");
  } else {
    screens.push("Profile");
  }

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
        <button className="nav-link ms-auto">
          <i class="bi bi-arrow-bar-right"></i>
        </button>
      )}
    </nav>
  );
};

export default Navigation;
