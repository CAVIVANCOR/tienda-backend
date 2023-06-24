const {Router}=require("express");
const {getBancosHandler,createBancosHandler, deleteBancoHandler, updateBancoHandler} = require("../../handlers/clientesProveedores/bancosHandlers");
const bancosRouter = Router();

bancosRouter.get("/",getBancosHandler);
bancosRouter.post("/",createBancosHandler);
bancosRouter.delete("/:id",deleteBancoHandler);
bancosRouter.put("/:id",updateBancoHandler);

module.exports = bancosRouter;