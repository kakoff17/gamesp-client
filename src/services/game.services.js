import service from "./config.services";

const gamesService = () => {
    return service.get("/games");
  };

const createGameService = () => {
  return service.post("/games")
}

  const gamesDetailsService = (gameId) => {
    return service.get(`/games/${gameId}`)
  }

  const editGameService = (gameId) => {
    return service.put(`/games/${gameId}`)
  }

  const gameCommentsService = (gameId) => {
    return service.get(`/games/${gameId}/comment`)
  }

  const postCommentService = (gameId) => {
    return service.post(`/games/${gameId}/comment`)
  }  

  const favGameService = (gameId) => {
    return service.post(`/games/${gameId}/fav`)
  }

  const removeFavService = (gameId) => {
    return service.post(`/games/${gameId}/fav/remove`)
  }


  export {
    gamesService,
    createGameService,
    editGameService,
    gamesDetailsService,
    gameCommentsService,
    postCommentService,
    favGameService,
    removeFavService
}