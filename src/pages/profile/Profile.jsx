import { useContext, useEffect, useState } from "react";
import { getProfileService } from "../../services/profile.services";
import { Link, useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { isAdmin } = useContext(AuthContext);

  const getData = async () => {
    try {
      const response = await getProfileService();
      setUser(response.data);
      //console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    <div>
      <Container>
        <Row className="justify-content-between">
          <Col>
            <Card className="mt-4 mb-4" style={{ width: "600px" }}>
              <Card.Body>
                <Card.Title>Usuario: {user.username}</Card.Title>
                <Card.Text>
                  <p>Correo: {user.email}</p>
                  <p>Rol: {user.role}</p>
                  <Link to="/profile/edit">
                    <Button variant="primary">Editar Perfil</Button>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4" style={{ width: "600px" }}>
              <Card.Body>
                <Card.Text>
                  <p>Juegos favoritos:</p>
                  {user.favGame.map(({ name, _id }) => {
                    const gameId = encodeURIComponent(_id); // Codificar el ID del juego para asegurar la URL correcta
                    const url = `/games/${gameId}`; // Construir la URL del enlace
                    return (
                      <a href={url} key={_id}>
                        {name}
                      </a>
                    );
                  })}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {isAdmin && (
        <Link to="/games/create">
          <Button className="mt-4 mb-4" variant="success">
            Añadir un juego nuevo
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Profile;
