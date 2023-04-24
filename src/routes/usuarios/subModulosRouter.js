const {Router}=require("express");
const {getSubModulosHandler} = require("../../handlers/usuarios/submodulosHandlers");
const subModulosRouter = Router();

subModulosRouter.get("/",getSubModulosHandler);

module.exports = subModulosRouter;