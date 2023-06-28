const {Router} = require("express");
const {getEstadoDocHandler, createEstadoDocHandler, deleteEstadoDocHandler, updateEstadoDocHandler, searchEstadoDocHandler}=require("../../handlers/tablas/estadoDocHandlers");
const estadoDocRouter = Router();

estadoDocRouter.get("/",getEstadoDocHandler);
estadoDocRouter.post("/",createEstadoDocHandler);
estadoDocRouter.delete("/:id",deleteEstadoDocHandler);
estadoDocRouter.put("/:id",updateEstadoDocHandler);
estadoDocRouter.get("/search/",searchEstadoDocHandler);

module.exports = estadoDocRouter;