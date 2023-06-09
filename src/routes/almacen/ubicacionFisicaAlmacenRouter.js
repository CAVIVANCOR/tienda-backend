const {Router} = require("express");
const {getUbicacionFisicaAlmacenHandler,createUbicacionFisicaAlmacenHandler, deleteUbicacionFisicaAlmacenHandler}=require("../../handlers/almacen/ubicacionFisicaAlmacenHandlers");
const ubicacionFisicaAlmacenRouter = Router();

ubicacionFisicaAlmacenRouter.get("/",getUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.post("/",createUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.delete("/:id",deleteUbicacionFisicaAlmacenHandler);

module.exports = ubicacionFisicaAlmacenRouter;