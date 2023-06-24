const {Router}=require("express");
const {getAccesosHandler, createAccesosHandler, deleteAccesoHandler} = require("../../handlers/usuarios/accesosHandlers");
const accesosRouter = Router();

accesosRouter.get("/",getAccesosHandler);
accesosRouter.post("/",createAccesosHandler);
accesosRouter.delete("/:id",deleteAccesoHandler);

module.exports = accesosRouter;