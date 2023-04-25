const {Router}=require("express");
const {getChoferTransportistaHandler} = require("../../handlers/clientesProveedores/choferesTransportistasHandlers");
const choferTransportistaRouter = Router();

choferTransportistaRouter.get("/",getChoferTransportistaHandler);

module.exports = choferTransportistaRouter;