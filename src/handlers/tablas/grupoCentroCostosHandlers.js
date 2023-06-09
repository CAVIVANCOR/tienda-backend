const {getAllGrupoCentroCostos, createGrupoCentroCostos} = require("../../controllers/tablas/grupoCentroCostosControllers");


const getGrupoCentroCostosHandler = async (req,res)=>{
    const results = await getAllGrupoCentroCostos();
    res.status(201).json(results);
};

const createGrupoCentroCostosHandler = async (req,res)=>{
    let registroGrupoCentroCostos = req.body;
    try {
        const results = await createGrupoCentroCostos(registroGrupoCentroCostos);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports = {getGrupoCentroCostosHandler, createGrupoCentroCostosHandler};