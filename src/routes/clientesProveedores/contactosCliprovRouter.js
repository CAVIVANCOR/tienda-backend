const {Router}=require("express");
const {getContactosCliProvHandler,createContactosCliProvHandler, deleteContactosCliProvHandler, updateContactosCliProvHandler} = require("../../handlers/clientesProveedores/contactosCliProvHandlers");
const contactoCliProvRouter = Router();

contactoCliProvRouter.get("/",getContactosCliProvHandler);
contactoCliProvRouter.post("/",createContactosCliProvHandler);
contactoCliProvRouter.delete("/:id",deleteContactosCliProvHandler);
contactoCliProvRouter.put("/:id",updateContactosCliProvHandler);

module.exports = contactoCliProvRouter;