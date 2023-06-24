const {Router} = require("express");
const {getUbicacionFisicaAlmacenHandler,createUbicacionFisicaAlmacenHandler, deleteUbicacionFisicaAlmacenHandler, updateUbicacionFisicaAlmacenHandler}=require("../../handlers/almacen/ubicacionFisicaAlmacenHandlers");
const ubicacionFisicaAlmacenRouter = Router();

ubicacionFisicaAlmacenRouter.get("/",getUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.post("/",createUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.delete("/:id",deleteUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.put("/:id",updateUbicacionFisicaAlmacenHandler);

module.exports = ubicacionFisicaAlmacenRouter;