const {Router}=require("express");
const {getProvinciaHandler} = require("../handlers/provinciasHandlers");
const provinciaRouter = Router();

provinciaRouter.get("/",getProvinciaHandler);

module.exports = provinciaRouter;