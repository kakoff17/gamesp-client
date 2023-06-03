import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">

        <Link className="navbar__link" to="/">Home</Link>
        <Link className="navbar__link" to="/games">Lista de juegos</Link>
        <Link className="navbar__link" to="/auth/signup">Crea una cuenta</Link>
        <Link className="navbar__link" to="/auth/login">Acceso</Link>

    </nav>
  )
}

export default Navbar