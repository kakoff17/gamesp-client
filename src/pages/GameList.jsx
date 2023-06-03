import { useEffect, useState } from "react";
import { gamesDetailsService } from "../services/game.services";
import axios from "axios";
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function GameList() {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/games");
      setGames(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <h3>... buscando juegos</h3>;
  }

  return (
    <div>
      <h1 className="text-center mt-5">Lista de videojuegos</h1>
      <Row className="justify-content-center">
        {games.map((eachGame) => (
          <Col key={eachGame._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={eachGame.image} alt={eachGame.name} width={200} height={150}/>
              <Card.Body>
                <Card.Title>{eachGame.name}</Card.Title>
                <Card.Text>Plataformas: {eachGame.platform.join(", ")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GameList;
