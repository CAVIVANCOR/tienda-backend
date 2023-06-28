const {Router}=require("express");
const {getModulosHandler,createModuloHandler, deleteModuloHandler, updateModuloHandler, searchModuloHandler} = require("../../handlers/usuarios/modulosHandlers");
const modulosRouter = Router();

modulosRouter.get("/",getModulosHandler);
modulosRouter.post("/",createModuloHandler);
modulosRouter.delete("/:id",deleteModuloHandler);
modulosRouter.put("/:id",updateModuloHandler);
modulosRouter.get("/search/",searchModuloHandler);

module.exports = modulosRouter;