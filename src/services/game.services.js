import service from "./config.services";


const gamesService = () => {
  return service.get("/games");
};

const createGameService = (newGame) => {
  return service.post("/games/create", newGame);
};

const gamesDetailsService = (gameId) => {
  return service.get(`/games/${gameId}`);
};

const deleteGameService = (gameId) => {
  return service.delete(`/games/${gameId}/delete`);
};

const editGameService = (gameId, updatedGame) => {
  return service.put(`/games/${gameId}/edit`, updatedGame);
};


export {
  gamesService,
  createGameService,
  deleteGameService,
  editGameService,
  gamesDetailsService,
}