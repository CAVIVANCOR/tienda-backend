const {Router}=require("express");
const {getClienteProveedorHandler,createClienteProveedorHandler, deleteClienteProveedorHandler} = require("../../handlers/clientesProveedores/clientesProveedoresHandlers");
const clienteProveedorRouter = Router();

clienteProveedorRouter.get("/",getClienteProveedorHandler);
clienteProveedorRouter.post("/",createClienteProveedorHandler);
clienteProveedorRouter.delete("/:id",deleteClienteProveedorHandler);

module.exports = clienteProveedorRouter;