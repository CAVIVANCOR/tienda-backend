const {Router} = require("express");
const {getUbicacionFisicaAlmacenHandler,createUbicacionFisicaAlmacenHandler, deleteUbicacionFisicaAlmacenHandler, updateUbicacionFisicaAlmacenHandler, searchUbicacionFisicaAlmacenHandler}=require("../../handlers/almacen/ubicacionFisicaAlmacenHandlers");
const ubicacionFisicaAlmacenRouter = Router();

ubicacionFisicaAlmacenRouter.get("/",getUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.post("/",createUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.delete("/:id",deleteUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.put("/:id",updateUbicacionFisicaAlmacenHandler);
ubicacionFisicaAlmacenRouter.get("/search/",searchUbicacionFisicaAlmacenHandler);

module.exports = ubicacionFisicaAlmacenRouter;