const {Router} = require("express");
const {getEstadoDocHandler, createEstadoDocHandler, deleteEstadoDocHandler}=require("../../handlers/tablas/estadoDocHandlers");
const estadoDocRouter = Router();

estadoDocRouter.get("/",getEstadoDocHandler);
estadoDocRouter.post("/",createEstadoDocHandler);
estadoDocRouter.delete("/:id",deleteEstadoDocHandler);

module.exports = estadoDocRouter;