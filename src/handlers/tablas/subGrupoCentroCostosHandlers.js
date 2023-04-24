const {getAllSubGrupoCentroCosto} = require("../../controllers/tablas/subGrupoCentroCostosControllers");


const getSubGrupoCentroCostoHandler = async (req,res)=>{
    const results = await getAllSubGrupoCentroCosto();
    res.status(201).json(results);
}

module.exports = {getSubGrupoCentroCostoHandler}