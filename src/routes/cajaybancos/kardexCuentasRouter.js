const {Router} = require("express");
const {getKardexCuentasHandler,createKardexCuentasHandler, deleteKardexCuentasHandler, updateKardexAlmacenHandler, searchKardexCuentasHandler}=require("../../handlers/cajaybancos/kardexCuentasHandlers");
const kardexCuentasRouter = Router();

kardexCuentasRouter.get("/",getKardexCuentasHandler);
kardexCuentasRouter.post("/",createKardexCuentasHandler);
kardexCuentasRouter.delete("/:id",deleteKardexCuentasHandler);
kardexCuentasRouter.put("/:id",updateKardexAlmacenHandler);
kardexCuentasRouter.get("/search/",searchKardexCuentasHandler);

module.exports = kardexCuentasRouter;