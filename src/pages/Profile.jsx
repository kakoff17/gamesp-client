import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { getProfileService } from "../services/profile.services";

function Profile() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userData = await getProfileService();
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h1>{user.username}'s profile</h1>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {/* Agrega más información del perfil */}
        </div>
      )}
    </div>
  );
}

export default Profile;