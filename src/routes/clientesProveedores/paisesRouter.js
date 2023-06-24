const {Router}=require("express");
const {getPaisHandler,createPaisHandler, deletePaisHandler} = require("../../handlers/clientesProveedores/paisesHandlers");
const paisesRouter = Router();

paisesRouter.get("/",getPaisHandler);
paisesRouter.post("/",createPaisHandler);
paisesRouter.delete("/:id",deletePaisHandler);

module.exports = paisesRouter;