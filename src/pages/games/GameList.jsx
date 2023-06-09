import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { gamesService } from "../../services/game.services";
import { Card, Container } from "react-bootstrap";
import Search from "../../components/Search";

function GameList() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFav, setIsFav] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const gameList = await gamesService();
      console.log(gameList); // verifico si trae todos los juegos
      setGames(gameList.data);
      setIsLoading(false);
      setFilteredGames(gameList.data);
      //console.log(gameList.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const searchProduct = (search) => {
    let foundGame = games.filter((eachGame) => {
      const gameName = eachGame.name.toLowerCase();
      const platforms = eachGame.platform;

      if (
        platforms.some((platform) => platform.toLowerCase().includes(search)) ||
        gameName.includes(search)
      ) {
        return true; // agrega el elemento
      } else {
        return false; // no lo agrega
      }
    });

    setFilteredGames(foundGame);
  };

  if (isLoading) {
    return (
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Search searchProduct={searchProduct} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {filteredGames.map((games) => (
          <Card key={games._id} style={{ width: "280px", margin: "10px" }}>
            <Card.Img variant="top" src={games.image} alt={games.name} />
            <Card.Body>
              <Card.Title>{games.name}</Card.Title>
              <Card.Text>Plataformas: {games.platform.join(", ")}</Card.Text>
              <Card.Link href={`/games/${games._id}`}>Ver detalles</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default GameList;
