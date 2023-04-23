const {Router}=require("express");
const {getProvinciaHandler} = require("../handlers/provinciasHandlers");
const provinciasRouter = Router();

provinciasRouter.get("/",getProvinciaHandler);

module.exports = provinciasRouter;