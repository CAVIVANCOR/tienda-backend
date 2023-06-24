const {Router}=require("express");
const {getUsuariosHandler,createUsuarioHandler, deleteUsuarioHandler} = require("../../handlers/usuarios/usuariosHandlers");
const usuariosRouter = Router();

usuariosRouter.get("/",getUsuariosHandler);
usuariosRouter.post("/",createUsuarioHandler);
usuariosRouter.delete("/:id",deleteUsuarioHandler);

module.exports = usuariosRouter;