const {Router}=require("express");
const {getTransportistaCliProvHandler,createTransportistaCliProvHandler} = require("../../handlers/clientesProveedores/transportistasCliProvHandlers");
const transportistaCliProvRouter = Router();

transportistaCliProvRouter.get("/",getTransportistaCliProvHandler);
transportistaCliProvRouter.post("/",createTransportistaCliProvHandler);

module.exports = transportistaCliProvRouter;