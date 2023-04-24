const {Router}=require("express");
const {getAccesosHandler} = require("../handlers/accesosHandlers");
const accesosRouter = Router();

accesosRouter.get("/",getAccesosHandler);

module.exports = accesosRouter;