const {getAllTiposCambio} = require("../controllers/tipoCambioControllers");


const getTiposCambioHandler = async (req,res)=>{
    const results = await getAllTiposCambio();
    res.status(201).json(results);
}

module.exports = {getTiposCambioHandler}