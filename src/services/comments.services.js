import service from "./config.services.js";

const getCommentService = (gameId) => {
  return service.get(`/games/${gameId}/comment`)
}

const createCommentService = (gameId, newComment) => {
    return service.post(`/games/${gameId}/comment`, newComment)
  }

  const deleteCommentService = (gameId, commId) => {
    return service.delete(`/games/${gameId}/comment/${commId}`)
  }

  export {
    createCommentService,
    deleteCommentService,
    getCommentService
  }