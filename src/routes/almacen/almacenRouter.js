const {Router} = require("express");
const {getAlmacenHandler,createAlmacenHandler,deleteAlmacenHandler, updateAlmacenHandler, searchByAlmacenHandler}=require("../../handlers/almacen/almacenesHandlers");
const almacenRouter = Router();

almacenRouter.get("/",getAlmacenHandler);
almacenRouter.post("/",createAlmacenHandler);
almacenRouter.delete("/:id",deleteAlmacenHandler);
almacenRouter.put("/:id",updateAlmacenHandler);
almacenRouter.get("/search/",searchByAlmacenHandler);

module.exports = almacenRouter;