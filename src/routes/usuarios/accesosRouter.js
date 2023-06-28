const {Router}=require("express");
const {getAccesosHandler, createAccesosHandler, deleteAccesoHandler, updateAccesoHandler, searchAccesoHandler} = require("../../handlers/usuarios/accesosHandlers");
const accesosRouter = Router();

accesosRouter.get("/",getAccesosHandler);
accesosRouter.post("/",createAccesosHandler);
accesosRouter.delete("/:id",deleteAccesoHandler);
accesosRouter.put("/:id",updateAccesoHandler);
accesosRouter.get("/search/",searchAccesoHandler);

module.exports = accesosRouter;