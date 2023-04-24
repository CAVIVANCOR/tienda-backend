const {getAllTiposDoc} = require("../../controllers/tablas/tipoDocumentoControllers");


const getTiposDocHandler = async (req,res)=>{
    const results = await getAllTiposDoc();
    res.status(201).json(results);
}

module.exports = {getTiposDocHandler}