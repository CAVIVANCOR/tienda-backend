const { getAllTipoCliProv, createTipoCliProv } = require("../../controllers/clientesProveedores/tiposCliProvControllers");

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

module.exports ={getTipoCliProvHandler, createTipoCliProvHandler};
