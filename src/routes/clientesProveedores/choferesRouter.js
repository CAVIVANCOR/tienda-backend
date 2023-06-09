const {Router}=require("express");
const {getChoferHandler,createChoferHandler} = require("../../handlers/clientesProveedores/choferesHandlers");
const choferRouter = Router();

choferRouter.get("/",getChoferHandler);
choferRouter.post("/",createChoferHandler);

module.exports = choferRouter;