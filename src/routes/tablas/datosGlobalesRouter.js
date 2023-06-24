const {Router}=require("express");
const {getDatosGlobalesHandler, createDatosGlobalesHandler, deleteDatosGlobalesHandler} = require("../../handlers/tablas/datosGlobalesHandlers");
const datosGlobalesRouter = Router();

datosGlobalesRouter.get("/",getDatosGlobalesHandler);
datosGlobalesRouter.post("/",createDatosGlobalesHandler);
datosGlobalesRouter.delete("/:id",deleteDatosGlobalesHandler);

module.exports = datosGlobalesRouter;