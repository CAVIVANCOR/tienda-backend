const {Router} = require("express");
const {getCabComprasHandler,createCabComprasHandler,deleteCabComprasHandler}=require("../../handlers/compras/cabComprasHandlers");
const cabComprasRouter = Router();

cabComprasRouter.get("/",getCabComprasHandler);
cabComprasRouter.post("/",createCabComprasHandler);
cabComprasRouter.delete("/:id",deleteCabComprasHandler);

module.exports = cabComprasRouter;