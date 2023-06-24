const {Router} = require("express");
const {getAlmacenHandler,createAlmacenHandler,deleteAlmacenHandler, updateAlmacenHandler}=require("../../handlers/almacen/almacenesHandlers");
const almacenRouter = Router();

almacenRouter.get("/",getAlmacenHandler);
almacenRouter.post("/",createAlmacenHandler);
almacenRouter.delete("/:id",deleteAlmacenHandler);
almacenRouter.put("/:id",updateAlmacenHandler);
module.exports = almacenRouter;