const {Router}=require("express");
const {getDatosGlobalesHandler} = require("../handlers/datosGlobalesHandlers");
const datosGlobalesRouter = Router();

datosGlobalesRouter.get("/",getDatosGlobalesHandler);

module.exports = datosGlobalesRouter;