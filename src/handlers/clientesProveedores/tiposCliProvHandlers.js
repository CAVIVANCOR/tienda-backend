const { getAllTipoCliProv, createTipoCliProv, deleteTipoCliProv, updateTipoCliProv } = require("../../controllers/clientesProveedores/tiposCliProvControllers");

const getTipoCliProvHandler = async (req,res)=>{
    const results = await getAllTipoCliProv();
    res.status(201).json(results);
};

const createTipoCliProvHandler = async (req,res)=>{
    let registroTipoCliProv = req.body;
    try {
        const results = await createTipoCliProv(registroTipoCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteTipoCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteTipoCliProv(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateTipoCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    let registroTipoCliProv = req.body;
    try {
        const results = await updateTipoCliProv(id,registroTipoCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getTipoCliProvHandler, createTipoCliProvHandler, deleteTipoCliProvHandler, updateTipoCliProvHandler};
