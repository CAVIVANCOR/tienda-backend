const {Router}=require("express");
const {getClienteProveedorHandler,createClienteProveedorHandler} = require("../../handlers/clientesProveedores/clientesProveedoresHandlers");
const clienteProveedorRouter = Router();

clienteProveedorRouter.get("/",getClienteProveedorHandler);
clienteProveedorRouter.post("/",createClienteProveedorHandler);

module.exports = clienteProveedorRouter;