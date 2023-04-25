const {Router}=require("express");
const {getClienteProveedorHandler} = require("../../handlers/clientesProveedores/clientesProveedoresHandlers");
const clienteProveedorRouter = Router();

clienteProveedorRouter.get("/",getClienteProveedorHandler);

module.exports = clienteProveedorRouter;