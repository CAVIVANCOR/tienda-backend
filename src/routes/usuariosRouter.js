const {Router}=require("express");
const {getUsuariosHandler} = require("../handlers/usuariosHandlers");
const usuariosRouter = Router();

usuariosRouter.get("/",getUsuariosHandler);

module.exports = usuariosRouter;