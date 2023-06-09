const { getAllConceptoMovC, createConceptoMovC } = require("../../controllers/cajaybancos/conceptoMovCControllers");

const getConceptoMovCHandler = async (req,res)=>{
    const results = await getAllConceptoMovC();
    res.status(201).json(results);
};

const createConceptoMovCHandler = async (req,res)=>{
    let registroConceptoMovC = req.body;
    try {
        const results = await createConceptoMovC(registroConceptoMovC);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getConceptoMovCHandler, createConceptoMovCHandler};
