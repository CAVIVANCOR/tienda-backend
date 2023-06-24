const {Router}=require("express");
const {getPersonalHandler,createPersonalHandler, deletePersonalHandler, updatePersonalHandler} = require("../../handlers/usuarios/personalHandlers");
const personalRouter = Router();

personalRouter.get("/",getPersonalHandler);
personalRouter.post("/",createPersonalHandler);
personalRouter.delete("/:id",deletePersonalHandler);
personalRouter.put("/:id",updatePersonalHandler);


module.exports = personalRouter;