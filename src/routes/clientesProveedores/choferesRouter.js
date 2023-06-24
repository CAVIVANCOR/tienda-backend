const {Router}=require("express");
const {getChoferHandler,createChoferHandler, deleteChoferHandler, updateChoferHandler} = require("../../handlers/clientesProveedores/choferesHandlers");
const choferRouter = Router();

choferRouter.get("/",getChoferHandler);
choferRouter.post("/",createChoferHandler);
choferRouter.delete("/:id",deleteChoferHandler);
choferRouter.put("/:id",updateChoferHandler);

module.exports = choferRouter;