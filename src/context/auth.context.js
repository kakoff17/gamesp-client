import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import { ColorRing } from "react-loader-spinner";

const AuthContext = createContext();

function AuthWrapper(props) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [isLoading, setIsloading] = useState(true); // valida token de usuario
  const [isAdmin, setIsAdmin] = useState("")

  useEffect(() => {
    authenticateUser();
  }, []);

  // funcion que invoca el servicio de verify
  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      response.data.payload.role.includes("admin")?setIsAdmin(true) : setIsAdmin(false)
      console.log(response)    
      setIsLoggedIn(true);
      setActiveUser(response.data.payload);
      setIsloading(false)
      
    } catch (error) {     
      console.log(error)
      setIsLoggedIn(false);
      setActiveUser(null);
      setIsloading(false)
    }
  };  
  
  console.log(activeUser)

  // el objeto de contexto que pasaremos
  const passedContext = {
    isLoggedIn,
    activeUser,
    authenticateUser,
    isAdmin,
  };

  

  if (isLoading) {
    return (
      <div className="App">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  // la renderizacion de la app con el contexto
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };