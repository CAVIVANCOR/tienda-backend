const {Router}=require("express");
const {getBancosHandler,createBancosHandler, deleteBancoHandler} = require("../../handlers/clientesProveedores/bancosHandlers");
const bancosRouter = Router();

bancosRouter.get("/",getBancosHandler);
bancosRouter.post("/",createBancosHandler);
bancosRouter.delete("/:id",deleteBancoHandler);

module.exports = bancosRouter;