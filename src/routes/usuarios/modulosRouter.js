const {Router}=require("express");
const {getModulosHandler,createModuloHandler} = require("../../handlers/usuarios/modulosHandlers");
const modulosRouter = Router();

modulosRouter.get("/",getModulosHandler);
modulosRouter.post("/",createModuloHandler);

module.exports = modulosRouter;