const {Router}=require("express");
const {getPersonalHandler,createPersonalHandler, deletePersonalHandler} = require("../../handlers/usuarios/personalHandlers");
const personalRouter = Router();

personalRouter.get("/",getPersonalHandler);
personalRouter.post("/",createPersonalHandler);
personalRouter.delete("/:id",deletePersonalHandler);


module.exports = personalRouter;