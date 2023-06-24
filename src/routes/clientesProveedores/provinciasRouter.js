const {Router}=require("express");
const {getProvinciaHandler,createProvinciaHandler, deleteProvinciasHandler, updateProvinciasHandler} = require("../../handlers/clientesProveedores/provinciasHandlers");
const provinciasRouter = Router();

provinciasRouter.get("/",getProvinciaHandler);
provinciasRouter.post("/",createProvinciaHandler);
provinciasRouter.delete("/:id",deleteProvinciasHandler);
provinciasRouter.put("/:id",updateProvinciasHandler);

module.exports = provinciasRouter;