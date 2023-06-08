import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { gamesService } from "../../services/game.services";
import { Card } from "react-bootstrap";

function GameList() {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const gameList = await await gamesService();
      setGames(gameList.data);
      setIsLoading(false);
      //console.log(gameList.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);


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
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {games.map((eachGame) => (
        <Card key={eachGame._id} style={{ width: "280px", margin: "10px"}}>
          <Card.Img variant="top" src={eachGame.image} alt={eachGame.name} />
          <Card.Body>
            <Card.Title>{eachGame.name}</Card.Title>
            <Card.Text>Plataformas: {eachGame.platform.join(", ")}</Card.Text>
            <Card.Link href={`/games/${eachGame._id}`}>Ver detalles</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default GameList;
