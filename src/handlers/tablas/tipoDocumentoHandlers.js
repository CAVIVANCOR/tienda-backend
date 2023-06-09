const {getAllTiposDoc, createTipoDoc, deleteTipoDocumento, updateTipoDocumento, searchTipoDocumento} = require("../../controllers/tablas/tipoDocumentoControllers");


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

const deleteTipoDocumentoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteTipoDocumento(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateTipoDocumentoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroTipoDoc = req.body;
    try {
        const results = await updateTipoDocumento(id,registroTipoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchTipoDocumentoHandler = async (req,res)=>{
    let registroTipoDoc = req.body;
    try {
        const results = await searchTipoDocumento(registroTipoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports = {getTiposDocHandler, createTipoDocHandler, deleteTipoDocumentoHandler, updateTipoDocumentoHandler, searchTipoDocumentoHandler};