const {getAllCentroCosto, createCentroCosto} = require("../../controllers/tablas/centroCostosControllers");

const getCentroCostosHandler = async (req,res)=>{
    const results = await getAllCentroCosto();
    res.status(201).json(results);
};

const createCentroCostosHandler = async (req,res)=>{
    let registroCentroCosto = req.body;
    try {
        const results = await createCentroCosto(registroCentroCosto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}
module.exports = {getCentroCostosHandler, createCentroCostosHandler};