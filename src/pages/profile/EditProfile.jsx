import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileService,
  editProfileService,
} from "../../services/profile.services";

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
        console.log(error)
        navigate("/error");
      }
    }
  };

  const getData = async () => {
    try {
      const response = await getProfileService();
      console.log(response)
      const { username, email, password } = response.data;
      setUsername(username);
      setEmail(email);
      setPassword(password);
    } catch (error) {
      console.log(error)
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3>Editar datos de usuario</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          onChange={handleUsernameChange}
          value={username}
        />
        <br />

        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          name="email"
          onChange={handleEmailChange}
          value={email}
        />
        <br />
        <label htmlFor="password">Nueva contraseña</label>
        <input
          type="password"
          name="password"
          onChange={handlePasswordChange}
          checked={password}
        />
        <br />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default EditProfile;
