import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileService,
  editProfileService,
} from "../../services/profile.services";
import { Button, Container, Form } from "react-bootstrap";

function EditProfile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = {
        username,
        email,
        password,
      };
      await editProfileService(updatedUser);
      navigate("/profile");
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  const getData = async () => {
    try {
      const response = await getProfileService();
      //console.log(response)
      const { username, email, password } = response.data;
      setUsername(username);
      setEmail(email);
      setPassword(password);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container className="d-flex justify-content-center">
      <div style={{ width: "300px" }}>
        <h3>Editar datos de usuario</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleUsernameChange}
              value={username}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleEmailChange}
              value={email}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nueva contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </Form.Group>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Button variant="primary" className="mt-4 mb-4" type="submit">
            Editar
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditProfile;
