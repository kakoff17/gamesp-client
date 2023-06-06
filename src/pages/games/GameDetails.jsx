import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Vortex } from "react-loader-spinner";
import ReactPlayer from "react-player";
import {
  addFavGameService,
  deleteGameService,
  gamesDetailsService,
  removeFavService,
} from "../../services/game.services";
import IsPrivate from "../../components/auth/IsPrivate";
import { AuthContext } from "../../context/auth.context";

function GameDetails() {
  const [singleGame, setSingleGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const gameDetail = await gamesDetailsService(params.gameId);
      console.log(gameDetail);
      setSingleGame(gameDetail.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGameService(params.gameId);
      navigate("/games");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleAddFavourite = async () => {
    try {
      await addFavGameService(params.gameId);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeleteFavourite = async () => {
    try {
      await removeFavService(params.gameId);
    } catch (error) {
      //console.log(error);
      navigate("/error");
    }
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
    <Container>
      {isLoggedIn && (
        <Button variant="primary" onClick={handleDelete}>
          Eliminar Juego
        </Button>
      )}
      {isLoggedIn && (
        <Link to={`/games/${params.gameId}/edit`}>
          <button>Editar Juego</button>
        </Link>
      )}
      <h1>Detalles de {singleGame.name}</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Img
              src={singleGame.image}
              alt={singleGame.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Text
                className="text-center"
                style={{ maxWidth: "500px", margin: "0 auto" }}
              >
                {singleGame.description}
              </Card.Text>
              <Card.Text>
                <strong>Género:</strong> {singleGame.genre.join(", ")}
              </Card.Text>
              <Card.Text>
                <strong>Plataformas disponibles:</strong>{" "}
                {singleGame.platform.join(", ")}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <strong>Video demostración</strong>
              </Card.Title>
              <div
                className="d-flex justify-content-center"
                
              >
                <ReactPlayer
                  url={singleGame.gameplay}
                  controls={true}
                  volume={0.05}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <section className="favBtn">
          {isLoggedIn && (
            <button onClick={handleAddFavourite}>Añadir a favoritos</button>
          )}
          {isLoggedIn && (
            <button onClick={handleDeleteFavourite}>
              Eliminar de favoritos
            </button>
          )}
        </section>
      </Row>
      {isLoggedIn && (
        <Link to="/game/:gameId/comments">
          <button>Ver comentarios del juego</button>
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/game/:gameId/comments/new">
          <button>Crea tu comentario del juego</button>
        </Link>
      )}
    </Container>
  );
}

export default GameDetails;
