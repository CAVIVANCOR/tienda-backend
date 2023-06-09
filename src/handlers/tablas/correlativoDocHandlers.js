const {getAllCorrelativoDoc, createCorrelativoDoc} = require("../../controllers/tablas/correlativoDocControllers");

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
module.exports = {getCorrelativoDocHandler, createCorrelativoDocHandler};