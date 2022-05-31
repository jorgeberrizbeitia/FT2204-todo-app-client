import { NavLink } from "react-router-dom";

import { useContext } from "react"
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext)

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser()
  }

  return (
    <div>

      { user !== null && <p>Bienvenido: {user.username}</p> }

      { isLoggedIn === true ? (
        <nav>
          <NavLink to="/" style={toggleStyles}> Home </NavLink>
          <NavLink to="/todos" end={true} style={toggleStyles}> Ver Lista </NavLink>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </nav>
      ) : (
        <nav>
          <NavLink to="/" style={toggleStyles}> Home </NavLink>
          <NavLink to="/signup" style={toggleStyles}> Registro </NavLink>
          <NavLink to="/login" style={toggleStyles}> Acceder </NavLink>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
