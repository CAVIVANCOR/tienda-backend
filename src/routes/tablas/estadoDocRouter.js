const {Router} = require("express");
const {getEstadoDocHandler, createEstadoDocHandler, deleteEstadoDocHandler, updateEstadoDocHandler}=require("../../handlers/tablas/estadoDocHandlers");
const estadoDocRouter = Router();

estadoDocRouter.get("/",getEstadoDocHandler);
estadoDocRouter.post("/",createEstadoDocHandler);
estadoDocRouter.delete("/:id",deleteEstadoDocHandler);
estadoDocRouter.put("/:id",updateEstadoDocHandler);

module.exports = estadoDocRouter;