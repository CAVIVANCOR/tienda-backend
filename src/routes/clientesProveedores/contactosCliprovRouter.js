const {Router}=require("express");
const {getContactosCliProvHandler} = require("../../handlers/clientesProveedores/contactosCliProvHandlers");
const contactoCliProvRouter = Router();

contactoCliProvRouter.get("/",getContactosCliProvHandler);

module.exports = contactoCliProvRouter;