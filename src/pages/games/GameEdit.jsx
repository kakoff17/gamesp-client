import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      console.log(singleGame);
      setName(singleGame.data.name);
      setDescription(singleGame.data.description);
      setImage(singleGame.data.image);
      setGenre(singleGame.data.genre);
      setPlatform(singleGame.data.platform);
      setGameplay(singleGame.data.gameplay);
    } catch (error) {
      console.log(error);
      //navigate a error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedGame = {
        name: 
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

  return (
    <div>
      <h3>Editar Juego</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />

        <br />

        <label htmlFor="description">Descripción:</label>
        <input
          type="textarea"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <br />

        <label htmlFor="image">Imagen</label>
        <input
          type="text"
          name="image"
          onChange={handleImageChange}
          value={image}
        />

        <br />

        <label htmlFor="genre">Genero</label>
        <input
          type="text"
          name="genre"
          onChange={handleGenreChange}
          value={genre}
        />

        <br />

        <label htmlFor="platform">Plataformas</label>
        <input
          type="text"
          name="platform"
          onChange={handlePlatformChange}
          value={platform}
        />

        <br />

        <label htmlFor="gameplay">Video Gameplay</label>
        <input
          type="text"
          name="gameplay"
          onChange={handleGameplayChange}
          value={gameplay}
        />
        <br />
        <button type="submit">Guardar</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default GameEdit;
