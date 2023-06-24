const {Router}=require("express");
const {getSubModulosHandler,createSubModuloHandler, deleteSubModuloHandler} = require("../../handlers/usuarios/submodulosHandlers");
const subModulosRouter = Router();

subModulosRouter.get("/",getSubModulosHandler);
subModulosRouter.post("/",createSubModuloHandler);
subModulosRouter.delete("/:id",deleteSubModuloHandler);

module.exports = subModulosRouter;