const {Router}=require("express");
const {getClienteProveedorHandler,createClienteProveedorHandler, deleteClienteProveedorHandler, updateClienteProveedorHandler} = require("../../handlers/clientesProveedores/clientesProveedoresHandlers");
const clienteProveedorRouter = Router();

clienteProveedorRouter.get("/",getClienteProveedorHandler);
clienteProveedorRouter.post("/",createClienteProveedorHandler);
clienteProveedorRouter.delete("/:id",deleteClienteProveedorHandler);
clienteProveedorRouter.put("/:id",updateClienteProveedorHandler);

module.exports = clienteProveedorRouter;