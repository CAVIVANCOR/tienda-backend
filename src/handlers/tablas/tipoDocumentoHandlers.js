const {getAllTiposDoc, createTipoDoc} = require("../../controllers/tablas/tipoDocumentoControllers");


const getTiposDocHandler = async (req,res)=>{
    const results = await getAllTiposDoc();
    res.status(201).json(results);
};

const createTipoDocHandler = async (req,res)=>{
    let registroTipoDoc = req.body;
    try {
        const results = await createTipoDoc(registroTipoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports = {getTiposDocHandler, createTipoDocHandler};