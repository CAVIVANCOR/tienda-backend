const {Router}=require("express");
const {getPaisHandler} = require("../../handlers/clientesProveedores/paisesHandlers");
const paisesRouter = Router();

paisesRouter.get("/",getPaisHandler);

module.exports = paisesRouter;