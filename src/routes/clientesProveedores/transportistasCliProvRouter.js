const {Router}=require("express");
const {getTransportistaCliProvHandler,createTransportistaCliProvHandler, deleteTransportistaCliProvHandler, updateTransportistaCliProvHandler, searchTransportistaCliProvHandler} = require("../../handlers/clientesProveedores/transportistasCliProvHandlers");
const transportistaCliProvRouter = Router();

transportistaCliProvRouter.get("/",getTransportistaCliProvHandler);
transportistaCliProvRouter.post("/",createTransportistaCliProvHandler);
transportistaCliProvRouter.delete("/:id",deleteTransportistaCliProvHandler);
transportistaCliProvRouter.put("/:id",updateTransportistaCliProvHandler);
transportistaCliProvRouter.get("/search/",searchTransportistaCliProvHandler);

module.exports = transportistaCliProvRouter;