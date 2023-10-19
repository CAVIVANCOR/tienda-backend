const {getAllMotivoNCND, createMotivoNCND, deleteMotivoNCND, updateMotivoNCND, searchMotivoNCND} = require("../../controllers/ventas/motivoNCNDControllers");


const getMotivoNCNDHandler = async (req,res)=>{
    const results = await getAllMotivoNCND();
    res.status(201).json(results);
};

const createMotivoNCNDHandler = async (req,res)=>{
    let registroMotivoNCND = req.body;
    try {
        const results = await createMotivoNCND(registroMotivoNCND);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteMotivoNCNDHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteMotivoNCND(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateMotivoNCNDHandler = async (req,res)=>{
    const id = req.params.id;
    let registroMotivoNCND = req.body;
    try {
        const results = await updateMotivoNCND(id,registroMotivoNCND);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchMotivoNCNDHandler = async (req,res)=>{
    let registroMotivoNCND = req.body;
    try {
        const results = await searchMotivoNCND(registroMotivoNCND);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports = {getMotivoNCNDHandler, createMotivoNCNDHandler, deleteMotivoNCNDHandler, updateMotivoNCNDHandler, searchMotivoNCNDHandler};