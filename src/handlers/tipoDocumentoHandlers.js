const {getAllTiposDoc} = require("../controllers/tipoDocumentoControllers");


const getTiposDocHandler = async (req,res)=>{
    const results = await getAllTiposDoc();
    res.status(201).json(results);
}

module.exports = {getTiposDocHandler}