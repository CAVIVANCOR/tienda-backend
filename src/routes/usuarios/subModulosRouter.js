const {Router}=require("express");
const {getSubModulosHandler,createSubModuloHandler} = require("../../handlers/usuarios/submodulosHandlers");
const subModulosRouter = Router();

subModulosRouter.get("/",getSubModulosHandler);
subModulosRouter.post("/",createSubModuloHandler);

module.exports = subModulosRouter;