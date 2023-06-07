import service from "./config.services";

const addFavGameService = (gameId) => {
    return service.post(`/games/${gameId}/fav`);
  };
  
  const removeFavService = (gameId) => {
    return service.post(`/games/${gameId}/fav/delete`);
  };

export {
  addFavGameService,
  removeFavService,  
};