const {Router}=require("express");
const {getDireccionesCliProvHandler} = require("../../handlers/clientesProveedores/direccionesCliProvHandlers");
const direccionesCliProvRouter = Router();

direccionesCliProvRouter.get("/",getDireccionesCliProvHandler);

module.exports = direccionesCliProvRouter;