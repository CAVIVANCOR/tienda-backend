const {Router}=require("express");
const {getDirCliProvHandler,createDirCliProvHandler, deleteDirCliProvHandler} = require("../../handlers/clientesProveedores/dirCliProvHandlers");
const dirCliProvRouter = Router();

dirCliProvRouter.get("/",getDirCliProvHandler);
dirCliProvRouter.post("/",createDirCliProvHandler);
dirCliProvRouter.delete("/:id",deleteDirCliProvHandler);

module.exports = dirCliProvRouter;