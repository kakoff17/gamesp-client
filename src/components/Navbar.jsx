import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>

        <Link to="/">Home</Link>
        <Link to="/auth/signup">Crea una cuenta</Link>
        <Link to="/auth/login">Acceso</Link>

    </nav>
  )
}

export default Navbar