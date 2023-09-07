const {getAllTiposCambio, createTiposCambio, deleteteTiposCambio, updateTiposCambio, searchTiposCambio, getLastTiposCambio} = require("../../controllers/tablas/tipoCambioControllers");


const getTiposCambioHandler = async (req,res)=>{
    try {
        const results = await getAllTiposCambio();
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const createTipoCambioHandler = async (req,res)=>{
    let registroTipoCambio = req.body;
    try {
        const results = await createTiposCambio(registroTipoCambio);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteteTipoCambioHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteteTiposCambio(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateTiposCambioHandler = async (req,res)=>{
    const id = req.params.id;
    let registroTipoCambio = req.body;
    try {
        const results = await updateTiposCambio(id,registroTipoCambio);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchTiposCambioHandler = async (req,res)=>{
    let registroTipoCambio = req.body;
    try {
        const results = await searchTiposCambio(registroTipoCambio);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const getLastTiposCambioHandler = async (req,res)=>{
    try {
        const results = await getLastTiposCambio();
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }    
};


module.exports = {getTiposCambioHandler, createTipoCambioHandler, deleteteTipoCambioHandler, updateTiposCambioHandler, searchTiposCambioHandler, getLastTiposCambioHandler};