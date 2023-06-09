const {Router} = require("express");
const {getCabComprasHandler,createCabComprasHandler}=require("../../handlers/compras/cabComprasHandlers");
const cabComprasRouter = Router();

cabComprasRouter.get("/",getCabComprasHandler);
cabComprasRouter.post("/",createCabComprasHandler);

module.exports = cabComprasRouter;