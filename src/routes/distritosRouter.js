const {Router}=require("express");
const {getDistritoHandler} = require("../handlers/DistritosHandlers");
const distritosRouter = Router();

distritosRouter.get("/",getDistritoHandler);

module.exports = distritosRouter;