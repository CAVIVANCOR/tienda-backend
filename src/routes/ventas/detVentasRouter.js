const {Router} = require("express");
const {getDetVentasHandler,createDetVentasHandler, deleteDetVentasHandler, updateDetVentasHandler}=require("../../handlers/ventas/detVentasHandlers");
const detVentasRouter = Router();

detVentasRouter.get("/",getDetVentasHandler);
detVentasRouter.post("/",createDetVentasHandler);
detVentasRouter.delete("/:id",deleteDetVentasHandler);
detVentasRouter.put("/:id",updateDetVentasHandler);

module.exports = detVentasRouter;