const {getAllEstadoDoc, createEstadoDoc} = require("../../controllers/tablas/estadoDocControllers");

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

module.exports = {getEstadoDocHandler, createEstadoDocHandler};