import service from "./config.services";

const getProfileService = () => {
  return service.get("/profile");
};

const editProfileService = (updatedProfile) => {
  return service.put("/profile/edit", updatedProfile);
};

const getFavGamesService = () => {
  return service.get("/profile/favs");
};

export { getProfileService, editProfileService, getFavGamesService };
