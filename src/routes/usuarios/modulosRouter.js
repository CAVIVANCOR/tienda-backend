const {Router}=require("express");
const {getModulosHandler,createModuloHandler, deleteModuloHandler} = require("../../handlers/usuarios/modulosHandlers");
const modulosRouter = Router();

modulosRouter.get("/",getModulosHandler);
modulosRouter.post("/",createModuloHandler);
modulosRouter.delete("/:id",deleteModuloHandler);

module.exports = modulosRouter;