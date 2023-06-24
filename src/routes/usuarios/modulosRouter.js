const {Router}=require("express");
const {getModulosHandler,createModuloHandler, deleteModuloHandler, updateModuloHandler} = require("../../handlers/usuarios/modulosHandlers");
const modulosRouter = Router();

modulosRouter.get("/",getModulosHandler);
modulosRouter.post("/",createModuloHandler);
modulosRouter.delete("/:id",deleteModuloHandler);
modulosRouter.put("/:id",updateModuloHandler);

module.exports = modulosRouter;