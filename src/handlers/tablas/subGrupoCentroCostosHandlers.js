const {getAllSubGrupoCentroCosto, createSubGrupoCentroCosto} = require("../../controllers/tablas/subGrupoCentroCostosControllers");


const getSubGrupoCentroCostoHandler = async (req,res)=>{
    const results = await getAllSubGrupoCentroCosto();
    res.status(201).json(results);
};

const createSubGrupoCentroCostoHandler = async (req,res)=>{
    let registroSubGrupoCentroCosto = req.body;
    try {
        const results = await createSubGrupoCentroCosto(registroSubGrupoCentroCosto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports = {getSubGrupoCentroCostoHandler, createSubGrupoCentroCostoHandler};