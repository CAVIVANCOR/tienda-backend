const {getAllTiposCambio} = require("../../controllers/tablas/tipoCambioControllers");


const getTiposCambioHandler = async (req,res)=>{
    const results = await getAllTiposCambio();
    res.status(201).json(results);
}

module.exports = {getTiposCambioHandler}