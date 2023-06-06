import { useEffect, useState } from "react";
import { getProfileService } from "../../services/profile.services";
import { Link, useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { Card } from "react-bootstrap";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await getProfileService();      
      setUser(response.data);
      console.log(response.data);
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
      <h4>Usuario: {user.username} </h4>
      <h4>Correo: {user.email}</h4>
      <h4>Rol: {user.role}</h4>
      <h4>Juegos favoritos: {user.favGame}</h4>
      <Link to="/profile/edit"><button>Editar Perfil</button></Link>
      </Card>
    </div>
  );
}

export default Profile;
