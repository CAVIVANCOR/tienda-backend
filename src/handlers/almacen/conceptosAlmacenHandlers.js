const { getAllConceptoAlmacen, createConceptoAlmacen, deleteConceptoAlmacen, updateConceptoAlmacen, searchConceptoAlmacen } = require("../../controllers/almacen/conceptosAlmacenControllers");

const getConceptoAlmacenHandler = async (req,res)=>{
    const results = await getAllConceptoAlmacen();
    res.status(201).json(results);
};

const createConceptoAlmacenHandler = async (req,res)=>{
    let registroConceptoAlmacen = req.body;
    try {
        const results = await createConceptoAlmacen(registroConceptoAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteConceptoAlmacenHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const results = await deleteConceptoAlmacen(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateConceptoAlmacenHandler = async (req,res)=>{
    const {id} = req.params;
    let registroConceptoAlmacen = req.body;
    try {
        const results = await updateConceptoAlmacen(id,registroConceptoAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchConceptoAlmacenHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchConceptoAlmacen(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getConceptoAlmacenHandler, createConceptoAlmacenHandler, deleteConceptoAlmacenHandler, updateConceptoAlmacenHandler, searchConceptoAlmacenHandler};
