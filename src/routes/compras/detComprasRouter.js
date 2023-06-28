const {Router} = require("express");
const {getDetComprasHandler,createDetComprasHandler, deleteDetComprasHandler, updateDetComprasHandler, searchDetComprasHandler}=require("../../handlers/compras/detComprasHandlers");
const detComprasRouter = Router();

detComprasRouter.get("/",getDetComprasHandler);
detComprasRouter.post("/",createDetComprasHandler);
detComprasRouter.delete("/:id",deleteDetComprasHandler);
detComprasRouter.put("/:id",updateDetComprasHandler);
detComprasRouter.get("/search/",searchDetComprasHandler);

module.exports = detComprasRouter;