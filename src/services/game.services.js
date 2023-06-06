import service from "./config.services";

// * Servicios de los juegos

const gamesService = () => {
  return service.get("/games");
};

const gamesDetailsService = (gameId) => {
  return service.get(`/games/${gameId}`);
};

const deleteGameService = (gameId) => {
  return service.delete(`/games/${gameId}`);
};

const editGameService = (gameId, updatedGame) => {
  return service.put(`/games/${gameId}/edit`, updatedGame);
};

// * Servicios de favoritos

const addFavGameService = (gameId) => {
  return service.post(`/games/${gameId}/fav`);
};

const removeFavService = (gameId) => {
  return service.post(`/games/${gameId}/fav/remove`);
};

//* Servicios de comentarios

const getCommService = (gameId) => {
  return service.get(`games/${gameId}/comments`);
};

const addCommService = (gameId) => {
  return service.post(`games/${gameId}/comments`);
};

const deleteCommService = (gameId, commentId) => {
  return service.delete(`games/${gameId}/comments/${commentId}`);
};

export {
  gamesService,
  deleteGameService,
  editGameService,
  gamesDetailsService,  
  addFavGameService,
  removeFavService,
  getCommService,
  addCommService,
  deleteCommService,
};
