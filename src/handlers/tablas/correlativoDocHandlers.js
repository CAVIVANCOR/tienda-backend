const {getAllCorrelativoDoc, createCorrelativoDoc, deleteCorrelativoDoc, updateCorrelativoDoc} = require("../../controllers/tablas/correlativoDocControllers");

const getCorrelativoDocHandler = async (req,res)=>{
    const results = await getAllCorrelativoDoc();
    res.status(201).json(results);
};

const createCorrelativoDocHandler = async (req,res)=>{
    let registroCorrelativoDoc = req.body;
    try {
        const results = await createCorrelativoDoc(registroCorrelativoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

const deleteCorrelativoDocHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteCorrelativoDoc(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateCorrelativoDocHandler = async (req,res)=>{
    const id = req.params.id;
    let registroCorrelativoDoc = req.body;
    try {
        const results = await updateCorrelativoDoc(id,registroCorrelativoDoc);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports = {getCorrelativoDocHandler, createCorrelativoDocHandler, deleteCorrelativoDocHandler, updateCorrelativoDocHandler};