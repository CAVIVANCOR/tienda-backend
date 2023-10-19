const {Router} = require("express");
const {getDetVentasHandler,createDetVentasHandler, deleteDetVentasHandler, updateDetVentasHandler, searchDetVentasHandler}=require("../../handlers/ventas/detVentasHandlers");
const detVentasRouter = Router();

detVentasRouter.get("/",getDetVentasHandler);
detVentasRouter.post("/",createDetVentasHandler);
detVentasRouter.delete("/:id",deleteDetVentasHandler);
detVentasRouter.put("/update/:id",updateDetVentasHandler);
detVentasRouter.post("/search/",searchDetVentasHandler);

module.exports = detVentasRouter;