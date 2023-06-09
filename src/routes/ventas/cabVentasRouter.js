const {Router} = require("express");
const {getCabVentasHandler,createCabVentasHandler}=require("../../handlers/ventas/cabVentasHandlers");
const cabVentasRouter = Router();

cabVentasRouter.get("/",getCabVentasHandler);
cabVentasRouter.post("/",createCabVentasHandler);

module.exports = cabVentasRouter;