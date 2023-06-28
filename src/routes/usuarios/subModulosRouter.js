const {Router}=require("express");
const {getSubModulosHandler,createSubModuloHandler, deleteSubModuloHandler, updateSubModuloHandler, searchSubModuloHandler} = require("../../handlers/usuarios/submodulosHandlers");
const subModulosRouter = Router();

subModulosRouter.get("/",getSubModulosHandler);
subModulosRouter.post("/",createSubModuloHandler);
subModulosRouter.delete("/:id",deleteSubModuloHandler);
subModulosRouter.put("/:id",updateSubModuloHandler);
subModulosRouter.get("/search/",searchSubModuloHandler);

module.exports = subModulosRouter;