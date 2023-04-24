const {getAllCorrelativoDoc} = require("../../controllers/tablas/correlativoDocControllers");


const getCorrelativoDocHandler = async (req,res)=>{
    const results = await getAllCorrelativoDoc();
    res.status(201).json(results);
}

module.exports = {getCorrelativoDocHandler}