const {Router}=require("express");
const {getRolesHandler,createRolHandler, deleteRolHandler} = require("../../handlers/usuarios/rolesHandlers");
const rolesRouter = Router();

rolesRouter.get("/",getRolesHandler);
rolesRouter.post("/",createRolHandler);
rolesRouter.delete("/:id",deleteRolHandler);

module.exports = rolesRouter;