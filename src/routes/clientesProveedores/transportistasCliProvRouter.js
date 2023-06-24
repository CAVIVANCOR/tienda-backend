const {Router}=require("express");
const {getTransportistaCliProvHandler,createTransportistaCliProvHandler, deleteTransportistaCliProvHandler} = require("../../handlers/clientesProveedores/transportistasCliProvHandlers");
const transportistaCliProvRouter = Router();

transportistaCliProvRouter.get("/",getTransportistaCliProvHandler);
transportistaCliProvRouter.post("/",createTransportistaCliProvHandler);
transportistaCliProvRouter.delete("/:id",deleteTransportistaCliProvHandler);

module.exports = transportistaCliProvRouter;