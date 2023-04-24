const {Router}=require("express");
const {getBancosHandler} = require("../../handlers/clientesProveedores/bancosHandlers");
const bancosRouter = Router();

bancosRouter.get("/",getBancosHandler);

module.exports = bancosRouter;