const {Router}=require("express");
const {getChoferHandler,createChoferHandler, deleteChoferHandler, updateChoferHandler, searchChoferHandler} = require("../../handlers/clientesProveedores/choferesHandlers");
const choferRouter = Router();

choferRouter.get("/",getChoferHandler);
choferRouter.post("/",createChoferHandler);
choferRouter.delete("/:id",deleteChoferHandler);
choferRouter.put("/:id",updateChoferHandler);
choferRouter.get("/search/",searchChoferHandler);

module.exports = choferRouter;