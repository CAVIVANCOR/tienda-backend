const {Router}=require("express");
const {getRolesHandler,createRolHandler, deleteRolHandler, updateRolHandler} = require("../../handlers/usuarios/rolesHandlers");
const rolesRouter = Router();

rolesRouter.get("/",getRolesHandler);
rolesRouter.post("/",createRolHandler);
rolesRouter.delete("/:id",deleteRolHandler);
rolesRouter.put("/:id",updateRolHandler);

module.exports = rolesRouter;