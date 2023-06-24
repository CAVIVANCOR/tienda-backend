const {getAllTiposCambio, createTiposCambio, deleteteTiposCambio} = require("../../controllers/tablas/tipoCambioControllers");


const getTiposCambioHandler = async (req,res)=>{
    const results = await getAllTiposCambio();
    res.status(201).json(results);
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
}

module.exports = {getTiposCambioHandler, createTipoCambioHandler, deleteteTipoCambioHandler};