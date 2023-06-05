import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {
  const navigate = useNavigate()

  const {isLoggedIn, authenticateUser } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken")

    authenticateUser()
    navigate("/")
  }

  return (
    <nav className="navbar">

        <NavLink to="/">Home</NavLink>
        <NavLink to="/games">Lista de juegos</NavLink>
        
        {isLoggedIn && <NavLink to="/profile">Mi perfil</NavLink>}
        {isLoggedIn && <a onClick={handleLogout}>Cerrar sesion</a>}
        {!isLoggedIn && <NavLink to="/auth/signup">Crea una cuenta</NavLink>}
        {!isLoggedIn &&<NavLink to="/auth/login">Acceso</NavLink>}
        
        

    </nav>
  )
}

export default Navbar