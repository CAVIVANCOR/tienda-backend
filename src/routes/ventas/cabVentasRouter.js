const {Router} = require("express");
const {getCabVentasHandler,createCabVentasHandler, deleteCabVentasHandler, updateCabVentasHandler}=require("../../handlers/ventas/cabVentasHandlers");
const cabVentasRouter = Router();

cabVentasRouter.get("/",getCabVentasHandler);
cabVentasRouter.post("/",createCabVentasHandler);
cabVentasRouter.delete("/:id",deleteCabVentasHandler);
cabVentasRouter.put("/:id",updateCabVentasHandler);

module.exports = cabVentasRouter;