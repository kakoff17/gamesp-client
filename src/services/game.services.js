import service from "./config.services";

const gamesService = () => {
    return service.get("/games");
  };

  const gamesDetailsService = (gameId) => {
    return service.get(`/games/${gameId}`)
  }  

  export {
    gamesService,
    gamesDetailsService
}