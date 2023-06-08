import { useContext, useEffect, useState } from "react";
import { getProfileService } from "../../services/profile.services";
import { Link, useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { Button, Card } from "react-bootstrap";
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
      <Card>
        <Card.Body>
          <Card.Title>Usuario: {user.username}</Card.Title>
          <Card.Text>
            <p>Correo: {user.email}</p>
            <p>Rol: {user.role}</p>
            </Card.Text><Card.Text>
            <p>Juegos favoritos:</p>
            {user.favGame.map(({ name, _id }) => {
              return <p key={_id}>{name}</p>;
            })}
          </Card.Text>
          <Link to="/profile/edit">
            <Button variant="primary">Editar Perfil</Button>
          </Link>
          {isAdmin && (
            <Link to="/games/create">
              <Button variant="success">Añadir un juego nuevo</Button>
            </Link>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
