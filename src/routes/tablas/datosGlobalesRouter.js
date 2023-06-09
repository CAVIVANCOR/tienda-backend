const {Router}=require("express");
const {getDatosGlobalesHandler, createDatosGlobalesHandler} = require("../../handlers/tablas/datosGlobalesHandlers");
const datosGlobalesRouter = Router();

datosGlobalesRouter.get("/",getDatosGlobalesHandler);
datosGlobalesRouter.post("/",createDatosGlobalesHandler);

module.exports = datosGlobalesRouter;