const {Router}=require("express");
const {getPaisHandler} = require("../handlers/paisesHandlers");
const paisRouter = Router();

paisRouter.get("/",getPaisHandler);

module.exports = paisRouter;