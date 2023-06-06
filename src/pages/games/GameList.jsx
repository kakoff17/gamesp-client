import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { gamesService } from "../../services/game.services";

function GameList() {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const gameList = await await gamesService();
      setGames(gameList.data);
      setIsLoading(false);
      console.log(gameList.data);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleGameClick = (gameId) => {
  //   navigate(`/game/${gameId}`);
  // };

  if (isLoading) {
    return <Vortex
    visible={true}
    height="80"
    width="80"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
  }

  return (
  <div class="container">
  <h1 class="text-center mt-5 mb-5">Lista de videojuegos</h1>
  <div class="row justify-content-center">
    {games.map((eachGame) => (
      <div key={eachGame._id} class="row justify-content-center">
        <Link to={`/games/${eachGame._id}`}>
          <img src={eachGame.image} alt={eachGame.name} width={300} height={225} />
        </Link>
        <div>
          <h2>{eachGame.name}</h2>
          <p class="text-center mt-1 mb-5">Plataformas: {eachGame.platform.join(", ")}</p>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default GameList;
