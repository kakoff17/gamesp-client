import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginService({
        email,
        password,
      });
      //console.log(response)
      
      // guarda el token de manera segura
      localStorage.setItem()

    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        navigate("/error") 
      }
    }
  };

  return (
    <div>
      <h1>Acceder</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

        <button type="submit">Acceso</button>
      </form>
    </div>
  );
}

export default Login;
