const {Router} = require("express");
const {getDetVentasHandler,createDetVentasHandler, deleteDetVentasHandler}=require("../../handlers/ventas/detVentasHandlers");
const detVentasRouter = Router();

detVentasRouter.get("/",getDetVentasHandler);
detVentasRouter.post("/",createDetVentasHandler);
detVentasRouter.delete("/:id",deleteDetVentasHandler);

module.exports = detVentasRouter;