const {Router}=require("express");
const {getUsuariosHandler,createUsuarioHandler} = require("../../handlers/usuarios/usuariosHandlers");
const usuariosRouter = Router();

usuariosRouter.get("/",getUsuariosHandler);
usuariosRouter.post("/",createUsuarioHandler);

module.exports = usuariosRouter;