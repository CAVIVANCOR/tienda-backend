const {Router} = require("express");
const {getCabComprasHandler,createCabComprasHandler,deleteCabComprasHandler, updateCabComprasHandler}=require("../../handlers/compras/cabComprasHandlers");
const cabComprasRouter = Router();

cabComprasRouter.get("/",getCabComprasHandler);
cabComprasRouter.post("/",createCabComprasHandler);
cabComprasRouter.delete("/:id",deleteCabComprasHandler);
cabComprasRouter.put("/:id",updateCabComprasHandler);

module.exports = cabComprasRouter;