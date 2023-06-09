const {Router}=require("express");
const {getBancosHandler,createBancosHandler} = require("../../handlers/clientesProveedores/bancosHandlers");
const bancosRouter = Router();

bancosRouter.get("/",getBancosHandler);
bancosRouter.post("/",createBancosHandler);

module.exports = bancosRouter;