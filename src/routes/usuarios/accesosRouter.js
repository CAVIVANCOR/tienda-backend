const {Router}=require("express");
const {getAccesosHandler, createAccesosHandler} = require("../../handlers/usuarios/accesosHandlers");
const accesosRouter = Router();

accesosRouter.get("/",getAccesosHandler);
accesosRouter.post("/",createAccesosHandler);

module.exports = accesosRouter;