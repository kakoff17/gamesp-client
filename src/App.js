import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Error from "./pages/errors/Error";
import NotFound from "./pages/errors/NotFound";
import Profile from "./pages/profile/Profile";
import GameList from "./pages/games/GameList";
import GameDetails from "./pages/games/GameDetails";
import EditProfile from "./pages/profile/EditProfile";
import IsPrivate from "./components/auth/IsPrivate";
import GameEdit from "./pages/games/GameEdit";
import GameCreate from "./pages/games/GameCreate";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/games/:gameId/edit" element={<GameEdit />} />

        {/* RUTAS DE PERFIL */}
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />        
        <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>}/>
        <Route path="/profile/edit" element={<IsPrivate><EditProfile /></IsPrivate>}/>
               
        {/* error handlers */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
