const {Router}=require("express");
const {getUsuariosHandler,createUsuarioHandler, deleteUsuarioHandler, updateUsuarioHandler} = require("../../handlers/usuarios/usuariosHandlers");
const usuariosRouter = Router();

usuariosRouter.get("/",getUsuariosHandler);
usuariosRouter.post("/",createUsuarioHandler);
usuariosRouter.delete("/:id",deleteUsuarioHandler);
usuariosRouter.put("/:id",updateUsuarioHandler);

module.exports = usuariosRouter;