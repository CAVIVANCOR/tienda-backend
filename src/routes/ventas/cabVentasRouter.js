const {Router} = require("express");
const {getCabVentasHandler,createCabVentasHandler, deleteCabVentasHandler, updateCabVentasHandler, searchByCabVentasHandler}=require("../../handlers/ventas/cabVentasHandlers");
const cabVentasRouter = Router();

cabVentasRouter.get("/",getCabVentasHandler);
cabVentasRouter.post("/",createCabVentasHandler);
cabVentasRouter.delete("/:id",deleteCabVentasHandler);
cabVentasRouter.put("/:id",updateCabVentasHandler);
cabVentasRouter.get("/search/",searchByCabVentasHandler);

module.exports = cabVentasRouter;