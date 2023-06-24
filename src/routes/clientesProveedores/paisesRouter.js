const {Router}=require("express");
const {getPaisHandler,createPaisHandler, deletePaisHandler, updatePaisHandler} = require("../../handlers/clientesProveedores/paisesHandlers");
const paisesRouter = Router();

paisesRouter.get("/",getPaisHandler);
paisesRouter.post("/",createPaisHandler);
paisesRouter.delete("/:id",deletePaisHandler);
paisesRouter.put("/:id",updatePaisHandler);

module.exports = paisesRouter;