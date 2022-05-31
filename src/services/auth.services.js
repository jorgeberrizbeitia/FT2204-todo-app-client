import service from "./config.services";

const signupService = (user) => {
  return service.post("/auth/signup", user)
}

const loginService = (user) => {
  return service.post("/auth/login", user)
}

const verifyService = () => {
  return service.get("/auth/verify")
} // ! necesitaremos configurar el envio del token

export {
  signupService,
  loginService,
  verifyService
}