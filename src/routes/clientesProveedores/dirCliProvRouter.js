const {Router}=require("express");
const {getDirCliProvHandler,createDirCliProvHandler, deleteDirCliProvHandler, updateDirCliProvHandler, searchDirCliProvHandler} = require("../../handlers/clientesProveedores/dirCliProvHandlers");
const dirCliProvRouter = Router();

dirCliProvRouter.get("/",getDirCliProvHandler);
dirCliProvRouter.post("/",createDirCliProvHandler);
dirCliProvRouter.delete("/:id",deleteDirCliProvHandler);
dirCliProvRouter.put("/:id",updateDirCliProvHandler);
dirCliProvRouter.get("/search/",searchDirCliProvHandler);

module.exports = dirCliProvRouter;