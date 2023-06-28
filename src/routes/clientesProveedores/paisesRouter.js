const {Router}=require("express");
const {getPaisHandler,createPaisHandler, deletePaisHandler, updatePaisHandler, searchPaisesHandler} = require("../../handlers/clientesProveedores/paisesHandlers");
const paisesRouter = Router();

paisesRouter.get("/",getPaisHandler);
paisesRouter.post("/",createPaisHandler);
paisesRouter.delete("/:id",deletePaisHandler);
paisesRouter.put("/:id",updatePaisHandler);
paisesRouter.get("/search/",searchPaisesHandler);

module.exports = paisesRouter;