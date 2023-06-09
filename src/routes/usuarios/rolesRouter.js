const {Router}=require("express");
const {getRolesHandler,createRolHandler} = require("../../handlers/usuarios/rolesHandlers");
const rolesRouter = Router();

rolesRouter.get("/",getRolesHandler);
rolesRouter.post("/",createRolHandler);

module.exports = rolesRouter;