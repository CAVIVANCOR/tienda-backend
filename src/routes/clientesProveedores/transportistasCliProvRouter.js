const {Router}=require("express");
const {getTransportistaCliProvHandler} = require("../../handlers/clientesProveedores/transportistasCliProvHandlers");
const transportistaCliProvRouter = Router();

transportistaCliProvRouter.get("/",getTransportistaCliProvHandler);

module.exports = transportistaCliProvRouter;