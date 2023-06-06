const IsAdmin = ({ user, children }) => {
  if (user && user.role === "admin") {
    return {children};
  } else {
    return null; 
  }
};

export default IsAdmin;