const {Router}=require("express");
const {getRolesHandler,createRolHandler, deleteRolHandler, updateRolHandler, searchRolHandler} = require("../../handlers/usuarios/rolesHandlers");
const rolesRouter = Router();

rolesRouter.get("/",getRolesHandler);
rolesRouter.post("/",createRolHandler);
rolesRouter.delete("/:id",deleteRolHandler);
rolesRouter.put("/:id",updateRolHandler);
rolesRouter.get("/search/",searchRolHandler);

module.exports = rolesRouter;