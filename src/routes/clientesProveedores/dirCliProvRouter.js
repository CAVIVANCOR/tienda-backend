const {Router}=require("express");
const {getDirCliProvHandler,createDirCliProvHandler} = require("../../handlers/clientesProveedores/dirCliProvHandlers");
const dirCliProvRouter = Router();

dirCliProvRouter.get("/",getDirCliProvHandler);
dirCliProvRouter.post("/",createDirCliProvHandler);

module.exports = dirCliProvRouter;