import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";
import { Button, Container, Form } from "react-bootstrap";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

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
      console.log(response);

      // guarda el token de manera segura
      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/profile");
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <div style={{ width: "300px" }}>
        <h1>Acceder</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Button variant="primary" className="mt-4 mb-4" type="submit">
            Acceso
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
