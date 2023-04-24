const {Router}=require("express");
const {getRolesHandler} = require("../handlers/rolesHandlers");
const rolesRouter = Router();

rolesRouter.get("/",getRolesHandler);

module.exports = rolesRouter;