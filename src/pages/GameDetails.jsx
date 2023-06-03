import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Vortex } from "react-loader-spinner";

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
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Img
              src={singleGame.image}
              alt={singleGame.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Card.Body>              
              <Card.Text
                style={{
                  maxWidth: "500px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
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
              <Card.Title>
                <strong>Video demostración</strong>
              </Card.Title>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={singleGame.gameplay}
                  title="Video del gameplay"
                  allowFullScreen
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GameDetails;
