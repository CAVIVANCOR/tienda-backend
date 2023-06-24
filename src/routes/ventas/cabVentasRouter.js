const {Router} = require("express");
const {getCabVentasHandler,createCabVentasHandler, deleteCabVentasHandler}=require("../../handlers/ventas/cabVentasHandlers");
const cabVentasRouter = Router();

cabVentasRouter.get("/",getCabVentasHandler);
cabVentasRouter.post("/",createCabVentasHandler);
cabVentasRouter.delete("/:id",deleteCabVentasHandler);

module.exports = cabVentasRouter;