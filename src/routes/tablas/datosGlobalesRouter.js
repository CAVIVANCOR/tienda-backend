const {Router}=require("express");
const {getDatosGlobalesHandler, createDatosGlobalesHandler, deleteDatosGlobalesHandler, updateDatosGlobalesHandler, searchDatoGlobalHandler} = require("../../handlers/tablas/datosGlobalesHandlers");
const datosGlobalesRouter = Router();

datosGlobalesRouter.get("/",getDatosGlobalesHandler);
datosGlobalesRouter.post("/",createDatosGlobalesHandler);
datosGlobalesRouter.delete("/:id",deleteDatosGlobalesHandler);
datosGlobalesRouter.put("/:id",updateDatosGlobalesHandler);
datosGlobalesRouter.get("/search/",searchDatoGlobalHandler);

module.exports = datosGlobalesRouter;