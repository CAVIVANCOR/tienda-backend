const {Router} = require("express");
const {getCabVentasHandler,createCabVentasHandler, deleteCabVentasHandler, updateCabVentasHandler, searchByCabVentasHandler}=require("../../handlers/ventas/cabVentasHandlers");
const cabVentasRouter = Router();

cabVentasRouter.get("/",getCabVentasHandler);
cabVentasRouter.post("/search/",searchByCabVentasHandler);
cabVentasRouter.post("/create/",createCabVentasHandler);
cabVentasRouter.put("/update/:id",updateCabVentasHandler);
cabVentasRouter.delete("/delete/:id",deleteCabVentasHandler);

module.exports = cabVentasRouter;