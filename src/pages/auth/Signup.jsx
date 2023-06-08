import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import { Form, Button, Container } from "react-bootstrap";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const user = { username, email, password };

      await signupService(user);
      navigate("/auth/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <div style={{ width: "300px" }}>
        <h1>Regístrate</h1>

        <Form onSubmit={handleSignup}>
          <Form.Group>
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group>
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
            Regístrate
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Signup;
