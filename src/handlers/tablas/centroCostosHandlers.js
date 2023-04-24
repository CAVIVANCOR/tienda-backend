const {getAllCentroCosto} = require("../../controllers/tablas/centroCostosControllers");

const getCentroCostosHandler = async (req,res)=>{
    const results = await getAllCentroCosto();
    res.status(201).json(results);
}

module.exports = {getCentroCostosHandler}