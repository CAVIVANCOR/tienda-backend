const {Router} = require("express");
const {getAlmacenHandler,createAlmacenHandler,deleteAlmacenHandler}=require("../../handlers/almacen/almacenesHandlers");
const almacenRouter = Router();

almacenRouter.get("/",getAlmacenHandler);
almacenRouter.post("/",createAlmacenHandler);
almacenRouter.delete("/:id",deleteAlmacenHandler);
module.exports = almacenRouter;