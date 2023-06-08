import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGameService } from "../../services/game.services";
import { Button, Form } from "react-bootstrap";

function GameCreate(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [gameplay, setGameplay] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handlePlatformChange = (e) => setPlatform(e.target.value);
  const handleGameplayChange = (e) => setGameplay(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newGame = {
        name: name,
        description: description,
        image: image,
        genre: genre,
        platform: platform,
        gameplay: gameplay,
      };

      await createGameService(newGame);
      navigate("/games");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="form">
      <h2>Añade un juego a la colección</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="name">
          <Form.Label>Nombre del juego:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleNameChange}
            value={name}
            className="mx-auto"
            style={{ width: "300px" }}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
            className="mx-auto"
            style={{ width: "300px" }}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Imagen (URL):</Form.Label>
          <Form.Control
            type="text"
            name="image"
            onChange={handleImageChange}
            value={image}
            className="mx-auto"
            style={{ width: "300px" }}
          />
        </Form.Group>

        <Form.Group controlId="genre">
          <Form.Label>Género:</Form.Label>
          <Form.Select
            multiple
            name="genre"
            onChange={handleGenreChange}
            value={[genre]}
            className="mx-auto"
            style={{ width: "300px" }}
          >
            <option value="Acción">Acción</option>
            <option value="Estrategia">Estrategia</option>
            <option value="Rol">Rol</option>
            <option value="Disparos">Disparos</option>
            <option value="Aventura">Aventura</option>
            <option value="Carreras">Carreras</option>
            <option value="Deportes">Deportes</option>
            <option value="Educación">Educación</option>
            <option value="Competitivo Competitivo multijugador">Competitivo multijugador</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="platform">
          <Form.Label>Plataformas: (PS4, PS5, PC, XBOX, NINTENDO)</Form.Label>
          <Form.Select
            multiple
            name="platform"
            onChange={handlePlatformChange}
            value={[platform]}
            className="mx-auto"
            style={{ width: "300px" }}
          >
            <option value="PS4">PS4</option>
            <option value="PS5">PS5</option>
            <option value="PC">PC</option>
            <option value="XBOX">XBOX</option>
            <option value="NINTENDO">NINTENDO</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="gameplay">
          <Form.Label>Gameplay video (URL):</Form.Label>
          <Form.Control
            type="text"
            name="gameplay"
            onChange={handleGameplayChange}
            value={gameplay}
            className="mx-auto"
            style={{ width: "300px" }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Añade el juego
        </Button>

        {errorMessage && (
          <p style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</p>
        )}
      </Form>
    </div>
  );
}

export default GameCreate;
