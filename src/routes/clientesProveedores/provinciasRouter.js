const {Router}=require("express");
const {getProvinciaHandler,createProvinciaHandler, deleteProvinciasHandler} = require("../../handlers/clientesProveedores/provinciasHandlers");
const provinciasRouter = Router();

provinciasRouter.get("/",getProvinciaHandler);
provinciasRouter.post("/",createProvinciaHandler);
provinciasRouter.delete("/:id",deleteProvinciasHandler);

module.exports = provinciasRouter;