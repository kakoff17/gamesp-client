import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    authenticateUser();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">

      <div>
      <img
        src={logo}
        alt="Logo"
        className="navbar-logo"
        width={80}
        height={30}
      />
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/games">
                Lista de juegos
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Mi perfil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleLogout}>
                    Cerrar sesión
                  </a>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/signup">
                    Crea una cuenta
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/login">
                    Acceso
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
