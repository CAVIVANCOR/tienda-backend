const {Router} = require("express");
const {getDetMovCuentasHandler,createDetMovCuentasHandler, deleteDetMovCuentasHandler, updateDetMovCuentasHandler, searchDetMovCuentasHandler}=require("../../handlers/cajaybancos/detMovCuentasHandlers");
const detMovCuentasRouter = Router();

detMovCuentasRouter.get("/",getDetMovCuentasHandler);
detMovCuentasRouter.post("/",createDetMovCuentasHandler);
detMovCuentasRouter.delete("/:id",deleteDetMovCuentasHandler);
detMovCuentasRouter.put("/:id",updateDetMovCuentasHandler);
detMovCuentasRouter.get("/search/",searchDetMovCuentasHandler);

module.exports = detMovCuentasRouter;