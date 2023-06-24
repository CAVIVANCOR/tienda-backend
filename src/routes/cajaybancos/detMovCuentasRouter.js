const {Router} = require("express");
const {getDetMovCuentasHandler,createDetMovCuentasHandler, deleteDetMovCuentasHandler}=require("../../handlers/cajaybancos/detMovCuentasHandlers");
const detMovCuentasRouter = Router();

detMovCuentasRouter.get("/",getDetMovCuentasHandler);
detMovCuentasRouter.post("/",createDetMovCuentasHandler);
detMovCuentasRouter.delete("/:id",deleteDetMovCuentasHandler);

module.exports = detMovCuentasRouter;