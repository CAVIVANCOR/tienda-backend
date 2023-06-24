const {Router}=require("express");
const {getDatosGlobalesHandler, createDatosGlobalesHandler, deleteDatosGlobalesHandler, updateDatosGlobalesHandler} = require("../../handlers/tablas/datosGlobalesHandlers");
const datosGlobalesRouter = Router();

datosGlobalesRouter.get("/",getDatosGlobalesHandler);
datosGlobalesRouter.post("/",createDatosGlobalesHandler);
datosGlobalesRouter.delete("/:id",deleteDatosGlobalesHandler);
datosGlobalesRouter.put("/:id",updateDatosGlobalesHandler);

module.exports = datosGlobalesRouter;