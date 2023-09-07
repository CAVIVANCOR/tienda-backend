const {Router}=require("express");
const {getPersonalHandler,createPersonalHandler, deletePersonalHandler, updatePersonalHandler, searchPersonalHandler} = require("../../handlers/usuarios/personalHandlers");
const personalRouter = Router();

personalRouter.get("/",getPersonalHandler);
personalRouter.post("/",createPersonalHandler);
personalRouter.delete("/:id",deletePersonalHandler);
personalRouter.put("/:id",updatePersonalHandler);
personalRouter.post("/search/",searchPersonalHandler);


module.exports = personalRouter;