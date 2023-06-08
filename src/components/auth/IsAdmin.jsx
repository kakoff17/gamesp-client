import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);
  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default IsAdmin;
