import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">

        <NavLink class="" to="/">Home</NavLink>
        <NavLink class="" to="/games">Lista de juegos</NavLink>
        <NavLink class="" to="/auth/signup">Crea una cuenta</NavLink>
        <NavLink class="" to="/auth/login">Acceso</NavLink>

    </nav>
  )
}

export default Navbar