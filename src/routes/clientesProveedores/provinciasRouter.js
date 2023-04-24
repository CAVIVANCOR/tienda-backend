const {Router}=require("express");
const {getProvinciaHandler} = require("../../handlers/clientesProveedores/provinciasHandlers");
const provinciasRouter = Router();

provinciasRouter.get("/",getProvinciaHandler);

module.exports = provinciasRouter;