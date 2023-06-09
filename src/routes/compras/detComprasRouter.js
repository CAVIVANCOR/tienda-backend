const {Router} = require("express");
const {getDetComprasHandler,createDetComprasHandler}=require("../../handlers/compras/detComprasHandlers");
const detComprasRouter = Router();

detComprasRouter.get("/",getDetComprasHandler);
detComprasRouter.post("/",createDetComprasHandler);

module.exports = detComprasRouter;