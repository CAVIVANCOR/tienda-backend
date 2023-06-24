const {Router} = require("express");
const {getDetComprasHandler,createDetComprasHandler, deleteDetComprasHandler, updateDetComprasHandler}=require("../../handlers/compras/detComprasHandlers");
const detComprasRouter = Router();

detComprasRouter.get("/",getDetComprasHandler);
detComprasRouter.post("/",createDetComprasHandler);
detComprasRouter.delete("/:id",deleteDetComprasHandler);
detComprasRouter.put("/:id",updateDetComprasHandler);

module.exports = detComprasRouter;