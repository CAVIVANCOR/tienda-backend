const {Router} = require("express");
const {getTiposCambioHandler}=require("../handlers/tipoCambioHandlers");
const tipoCambioRouter = Router();

tipoCambioRouter.get("/",getTiposCambioHandler);

module.exports = tipoCambioRouter;
