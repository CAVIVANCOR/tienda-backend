const {Router} = require("express");
const {getDetMovCuentasHandler,createDetMovCuentasHandler, deleteDetMovCuentasHandler, updateDetMovCuentasHandler}=require("../../handlers/cajaybancos/detMovCuentasHandlers");
const detMovCuentasRouter = Router();

detMovCuentasRouter.get("/",getDetMovCuentasHandler);
detMovCuentasRouter.post("/",createDetMovCuentasHandler);
detMovCuentasRouter.delete("/:id",deleteDetMovCuentasHandler);
detMovCuentasRouter.put("/:id",updateDetMovCuentasHandler);

module.exports = detMovCuentasRouter;