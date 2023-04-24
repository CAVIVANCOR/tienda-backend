const {Router} = require("express");
const {getEstadoDocHandler}=require("../../handlers/tablas/estadoDocHandlers");
const estadoDocRouter = Router();

estadoDocRouter.get("/",getEstadoDocHandler);

module.exports = estadoDocRouter;