import service from "./config.services";

const searchService = (searchTerm) => {
  return service.get("/", {
    params: {
      searchTerm
    }
  });
};

export { 
  searchService
};