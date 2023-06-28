const {Router}=require("express");
const {getContactosCliProvHandler,createContactosCliProvHandler, deleteContactosCliProvHandler, updateContactosCliProvHandler, searchContactosCliProvHandler} = require("../../handlers/clientesProveedores/contactosCliProvHandlers");
const contactoCliProvRouter = Router();

contactoCliProvRouter.get("/",getContactosCliProvHandler);
contactoCliProvRouter.post("/",createContactosCliProvHandler);
contactoCliProvRouter.delete("/:id",deleteContactosCliProvHandler);
contactoCliProvRouter.put("/:id",updateContactosCliProvHandler);
contactoCliProvRouter.get("/search/",searchContactosCliProvHandler);

module.exports = contactoCliProvRouter;