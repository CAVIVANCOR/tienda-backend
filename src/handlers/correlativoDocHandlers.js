const {getAllCorrelativoDoc} = require("../controllers/correlativoDocControllers");


const getCorrelativoDocHandler = async (req,res)=>{
    const results = await getAllCorrelativoDoc();
    res.status(201).json(results);
}

module.exports = {getCorrelativoDocHandler}