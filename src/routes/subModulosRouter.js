const {Router}=require("express");
const {getSubModulosHandler} = require("../handlers/submodulosHandlers");
const subModulosRouter = Router();

subModulosRouter.get("/",getSubModulosHandler);

module.exports = subModulosRouter;