const {Router}=require("express");
const {getAccesosHandler, createAccesosHandler, deleteAccesoHandler, updateAccesoHandler} = require("../../handlers/usuarios/accesosHandlers");
const accesosRouter = Router();

accesosRouter.get("/",getAccesosHandler);
accesosRouter.post("/",createAccesosHandler);
accesosRouter.delete("/:id",deleteAccesoHandler);
accesosRouter.put("/:id",updateAccesoHandler);

module.exports = accesosRouter;