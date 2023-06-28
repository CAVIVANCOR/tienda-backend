const {Router}=require("express");
const {getClienteProveedorHandler,createClienteProveedorHandler, deleteClienteProveedorHandler, updateClienteProveedorHandler, searchClienteProveedorHandler} = require("../../handlers/clientesProveedores/clientesProveedoresHandlers");
const clienteProveedorRouter = Router();

clienteProveedorRouter.get("/",getClienteProveedorHandler);
clienteProveedorRouter.post("/",createClienteProveedorHandler);
clienteProveedorRouter.delete("/:id",deleteClienteProveedorHandler);
clienteProveedorRouter.put("/:id",updateClienteProveedorHandler);
clienteProveedorRouter.get("/search/",searchClienteProveedorHandler);

module.exports = clienteProveedorRouter;