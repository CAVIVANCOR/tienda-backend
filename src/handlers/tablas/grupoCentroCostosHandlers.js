const {getAllGrupoCentroCostos} = require("../../controllers/tablas/grupoCentroCostosControllers");


const getGrupoCentroCostosHandler = async (req,res)=>{
    const results = await getAllGrupoCentroCostos();
    res.status(201).json(results);
}

module.exports = {getGrupoCentroCostosHandler}