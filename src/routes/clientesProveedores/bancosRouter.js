const {Router}=require("express");
const {getBancosHandler,createBancosHandler, deleteBancoHandler, updateBancoHandler, searchBancosHandler} = require("../../handlers/clientesProveedores/bancosHandlers");
const bancosRouter = Router();

bancosRouter.get("/",getBancosHandler);
bancosRouter.post("/",createBancosHandler);
bancosRouter.delete("/:id",deleteBancoHandler);
bancosRouter.put("/:id",updateBancoHandler);
bancosRouter.get("/search/",searchBancosHandler);

module.exports = bancosRouter;