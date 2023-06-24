const {Router}=require("express");
const {getContactosCliProvHandler,createContactosCliProvHandler, deleteContactosCliProvHandler} = require("../../handlers/clientesProveedores/contactosCliProvHandlers");
const contactoCliProvRouter = Router();

contactoCliProvRouter.get("/",getContactosCliProvHandler);
contactoCliProvRouter.post("/",createContactosCliProvHandler);
contactoCliProvRouter.delete("/:id",deleteContactosCliProvHandler);

module.exports = contactoCliProvRouter;