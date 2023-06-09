const {Router} = require("express");
const {getDetVentasHandler,createDetVentasHandler}=require("../../handlers/ventas/detVentasHandlers");
const detVentasRouter = Router();

detVentasRouter.get("/",getDetVentasHandler);
detVentasRouter.post("/",createDetVentasHandler);

module.exports = detVentasRouter;