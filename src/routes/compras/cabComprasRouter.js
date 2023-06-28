const {Router} = require("express");
const {getCabComprasHandler,createCabComprasHandler,deleteCabComprasHandler, updateCabComprasHandler, searchByCabComprasHandler}=require("../../handlers/compras/cabComprasHandlers");
const cabComprasRouter = Router();

cabComprasRouter.get("/",getCabComprasHandler);
cabComprasRouter.post("/",createCabComprasHandler);
cabComprasRouter.delete("/:id",deleteCabComprasHandler);
cabComprasRouter.put("/:id",updateCabComprasHandler);
cabComprasRouter.get("/search/",searchByCabComprasHandler);

module.exports = cabComprasRouter;