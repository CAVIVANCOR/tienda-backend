const {Router}=require("express");
const {getTransportistaCliProvHandler,createTransportistaCliProvHandler, deleteTransportistaCliProvHandler, updateTransportistaCliProvHandler} = require("../../handlers/clientesProveedores/transportistasCliProvHandlers");
const transportistaCliProvRouter = Router();

transportistaCliProvRouter.get("/",getTransportistaCliProvHandler);
transportistaCliProvRouter.post("/",createTransportistaCliProvHandler);
transportistaCliProvRouter.delete("/:id",deleteTransportistaCliProvHandler);
transportistaCliProvRouter.put("/:id",updateTransportistaCliProvHandler);

module.exports = transportistaCliProvRouter;