const { getAllTipoCliProv } = require("../../controllers/clientesProveedores/tiposCliProvControllers");

const getTipoCliProvHandler = async (req,res)=>{
    const results = await getAllTipoCliProv();
    res.status(201).json(results);
};

module.exports ={getTipoCliProvHandler}
