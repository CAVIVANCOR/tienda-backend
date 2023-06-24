const { getAllConceptoMovC, createConceptoMovC, deleteConceptoMovC } = require("../../controllers/cajaybancos/conceptoMovCControllers");

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

const deleteConceptoMovCHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteConceptoMovC(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getConceptoMovCHandler, createConceptoMovCHandler, deleteConceptoMovCHandler};
