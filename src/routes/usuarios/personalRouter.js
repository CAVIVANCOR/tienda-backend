const {Router}=require("express");
const {getPersonalHandler,createPersonalHandler} = require("../../handlers/usuarios/personalHandlers");
const personalRouter = Router();

personalRouter.get("/",getPersonalHandler);
personalRouter.post("/",createPersonalHandler);


module.exports = personalRouter;