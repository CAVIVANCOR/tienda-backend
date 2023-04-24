const {Router}=require("express");
const {getModulosHandler} = require("../handlers/modulosHandlers");
const modulosRouter = Router();

modulosRouter.get("/",getModulosHandler);

module.exports = modulosRouter;