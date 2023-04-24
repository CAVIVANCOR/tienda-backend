const {Router}=require("express");
const {getPersonalHandler} = require("../../handlers/usuarios/personalHandlers");
const personalRouter = Router();

personalRouter.get("/",getPersonalHandler);

module.exports = personalRouter;