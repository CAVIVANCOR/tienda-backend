const {getAllSubGrupoCentroCosto, createSubGrupoCentroCosto, deleteSubGrupoCentroCosto, updateSubGrupoCentroCosto} = require("../../controllers/tablas/subGrupoCentroCostosControllers");


const getSubGrupoCentroCostoHandler = async (req,res)=>{
    const results = await getAllSubGrupoCentroCosto();
    res.status(201).json(results);
};

const createSubGrupoCentroCostoHandler = async (req,res)=>{
    let registroSubGrupoCentroCosto = req.body;
    try {
        const results = await createSubGrupoCentroCosto(registroSubGrupoCentroCosto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteSubGrupoCentroCostoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteSubGrupoCentroCosto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateSubGrupoCentroCostoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroSubGrupoCentroCosto = req.body;
    try {
        const results = await updateSubGrupoCentroCosto(id,registroSubGrupoCentroCosto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports = {getSubGrupoCentroCostoHandler, createSubGrupoCentroCostoHandler, deleteSubGrupoCentroCostoHandler, updateSubGrupoCentroCostoHandler};