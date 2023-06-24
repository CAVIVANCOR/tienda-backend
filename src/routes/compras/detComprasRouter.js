const {Router} = require("express");
const {getDetComprasHandler,createDetComprasHandler, deleteDetComprasHandler}=require("../../handlers/compras/detComprasHandlers");
const detComprasRouter = Router();

detComprasRouter.get("/",getDetComprasHandler);
detComprasRouter.post("/",createDetComprasHandler);
detComprasRouter.delete("/:id",deleteDetComprasHandler);

module.exports = detComprasRouter;