const {Router} = require("express");
const {getEstadoDocHandler}=require("../handlers/estadoDocHandlers");
const estadoDocRouter = Router();

estadoDocRouter.get("/",getEstadoDocHandler);

module.exports = estadoDocRouter;