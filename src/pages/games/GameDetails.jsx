import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Vortex } from "react-loader-spinner";
import ReactPlayer from 'react-player'
import IsAdmin from "../../components/auth/IsAdmin";

function GameDetails() {
  const [singleGame, setSingleGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/games/${params.gameId}`
      );
      console.log(response);
      setSingleGame(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Vortex
    visible={true}
    height="80"
    width="80"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
  }

  return (
    <Container>
      <h1 className="text-center mt-5 mb-5">Detalles de {singleGame.name}</h1>
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
                <strong>Género:</strong> {singleGame.genre.join(" - ")}
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
              style={{ marginLeft: "460px" }}
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
      </Row>
      <IsAdmin><button>Eliminar Juego</button> </IsAdmin>
      <IsAdmin><button>Editar Juego</button></IsAdmin>
    </Container>
  );
}

export default GameDetails;
