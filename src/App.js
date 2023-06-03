import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Error from "./pages/errors/Error";
import NotFound from "./pages/errors/NotFound";
import Profile from "./pages/Profile";
import GameList from "./pages/GameList";
import GameDetails from "./pages/GameDetails";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/game/:gameId" element={<GameDetails />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* error handlers */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
