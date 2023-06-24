const {Router} = require("express");
const {getKardexCuentasHandler,createKardexCuentasHandler, deleteKardexCuentasHandler}=require("../../handlers/cajaybancos/kardexCuentasHandlers");
const kardexCuentasRouter = Router();

kardexCuentasRouter.get("/",getKardexCuentasHandler);
kardexCuentasRouter.post("/",createKardexCuentasHandler);
kardexCuentasRouter.delete("/:id",deleteKardexCuentasHandler);

module.exports = kardexCuentasRouter;