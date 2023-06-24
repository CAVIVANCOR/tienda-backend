const {Router} = require("express");
const {getKardexCuentasHandler,createKardexCuentasHandler, deleteKardexCuentasHandler, updateKardexAlmacenHandler}=require("../../handlers/cajaybancos/kardexCuentasHandlers");
const kardexCuentasRouter = Router();

kardexCuentasRouter.get("/",getKardexCuentasHandler);
kardexCuentasRouter.post("/",createKardexCuentasHandler);
kardexCuentasRouter.delete("/:id",deleteKardexCuentasHandler);
kardexCuentasRouter.put("/:id",updateKardexAlmacenHandler);

module.exports = kardexCuentasRouter;