const {getAllEstadoDoc} = require("../../controllers/tablas/estadoDocControllers");

const getEstadoDocHandler = async (req,res)=>{
    const results = await getAllEstadoDoc();
    res.status(201).json(results);
}

module.exports = {getEstadoDocHandler}