import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  editGameService,
  gamesDetailsService,
} from "../../services/game.services";

function GameEdit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [gameplay, setGameplay] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handlePlatformChange = (e) => setPlatform(e.target.value);
  const handleGameplayChange = (e) => setGameplay(e.target.value);

  const { gameId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const singleGame = await gamesDetailsService(gameId);
      const { name, description, image, genre, platform, gameplay } =
        singleGame.data.game;
      console.log(singleGame);
      setName(name);
      setDescription(description);
      setImage(image);
      setGenre(genre);
      setPlatform(platform);
      setGameplay(gameplay);
    } catch (error) {
      console.log(error);
      //navigate a error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedGame = {
        name,
        description,
        image,
        genre,
        platform,
        gameplay,
      };
      await editGameService(gameId, updatedGame);
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  console.log(name);
  return (
    <div className="d-flex justify-content-center">
      <div>
        <h3>Editar Juego</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleNameChange}
              value={name}
              style={{ width: "300px" }}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleDescriptionChange}
              value={description}
              style={{ width: "300px" }}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Imagen:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleImageChange}
              value={image}
              style={{ width: "300px" }}
            />
          </Form.Group>

          <Form.Group controlId="genre">
            <Form.Label>Género:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleGenreChange}
              value={genre}
              style={{ width: "300px" }}
            />
          </Form.Group>

          <Form.Group controlId="platform">
            <Form.Label>Plataformas:</Form.Label>
            <Form.Control
              type="text"
              onChange={handlePlatformChange}
              value={platform}
              style={{ width: "300px" }}
            />
          </Form.Group>

          <Form.Group controlId="gameplay">
            <Form.Label>Gameplay:</Form.Label>
            <Form.Control
              type="text"
              onChange={handleGameplayChange}
              value={gameplay}
              style={{ width: "300px" }}
            />
          </Form.Group>

          <Button variant="primary" className="mt-4 mb-4" type="submit">
            Guardar
          </Button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Form>
      </div>
    </div>
  );
}

export default GameEdit;
