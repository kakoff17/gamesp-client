import { useEffect, useState } from "react";
import { getProfileService } from "../../services/profile.services";
import { Link, useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";

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
    } catch (err) {
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
    <div>
      <h4>Usuario: {user.username} </h4>
      <h4>Correo: {user.email}</h4>
      <h4>Rol: {user.role}</h4>
      <Link to="/profile/edit">
        <button>Editar Perfil</button>
      </Link>
    </div>
  );
}

export default Profile;
