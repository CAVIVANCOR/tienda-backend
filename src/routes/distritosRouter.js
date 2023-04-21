const {Router}=require("express");
const {getDistritoHandler} = require("../handlers/DistritosHandlers");
const distritoRouter = Router();

distritoRouter.get("/",getDistritoHandler);

module.exports = distritoRouter;