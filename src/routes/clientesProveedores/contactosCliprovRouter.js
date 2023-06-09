const {Router}=require("express");
const {getContactosCliProvHandler,createContactosCliProvHandler} = require("../../handlers/clientesProveedores/contactosCliProvHandlers");
const contactoCliProvRouter = Router();

contactoCliProvRouter.get("/",getContactosCliProvHandler);
contactoCliProvRouter.post("/",createContactosCliProvHandler);

module.exports = contactoCliProvRouter;