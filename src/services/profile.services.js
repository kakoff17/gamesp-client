import service from "./config.services"

const getProfileService = () => {
return service.get("/profile")
}

export { 
    getProfileService
} 