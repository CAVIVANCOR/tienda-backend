const {Router} = require("express");
const {getEstadoDocHandler, createEstadoDocHandler}=require("../../handlers/tablas/estadoDocHandlers");
const estadoDocRouter = Router();

estadoDocRouter.get("/",getEstadoDocHandler);
estadoDocRouter.post("/",createEstadoDocHandler);

module.exports = estadoDocRouter;