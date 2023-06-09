const {Router}=require("express");
const {getPaisHandler,createPaisHandler} = require("../../handlers/clientesProveedores/paisesHandlers");
const paisesRouter = Router();

paisesRouter.get("/",getPaisHandler);
paisesRouter.post("/",createPaisHandler);

module.exports = paisesRouter;