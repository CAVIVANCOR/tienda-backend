const {Router} = require("express");
const {getMotivoNCNDHandler, createMotivoNCNDHandler, deleteMotivoNCNDHandler, updateMotivoNCNDHandler, searchMotivoNCNDHandler}=require("../../handlers/ventas/motivoNCNDHandlers");
const motivoNCNDRouter = Router();

motivoNCNDRouter.get("/",getMotivoNCNDHandler);
motivoNCNDRouter.post("/",createMotivoNCNDHandler);
motivoNCNDRouter.delete("/:id",deleteMotivoNCNDHandler);
motivoNCNDRouter.put("/:id",updateMotivoNCNDHandler);
motivoNCNDRouter.post("/search/",searchMotivoNCNDHandler);

module.exports = motivoNCNDRouter;
