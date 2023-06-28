const {getAllEstadoDoc, createEstadoDoc, deleteEstadoDoc, updateEstadoDoc, searchEstadoDoc} = require("../../controllers/tablas/estadoDocControllers");

const getEstadoDocHandler = async (req,res)=>{
    const results = await getAllEstadoDoc();
    res.status(201).json(results);
};

const createEstadoDocHandler = async (req,res)=>{
    let registroEstadoDoc = req.body;
    try {
        const results = await createEstadoDoc(registroEstadoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteEstadoDocHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteEstadoDoc(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateEstadoDocHandler = async (req,res)=>{
    const id = req.params.id;
    let registroEstadoDoc = req.body;
    try {
        const results = await updateEstadoDoc(id,registroEstadoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchEstadoDocHandler = async (req,res)=>{
    let registroEstadoDoc = req.body;
    try {
        const results = await searchEstadoDoc(registroEstadoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};


module.exports = {getEstadoDocHandler, createEstadoDocHandler, deleteEstadoDocHandler, updateEstadoDocHandler, searchEstadoDocHandler};