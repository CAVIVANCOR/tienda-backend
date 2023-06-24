const { getAllTipoExistenciaCont, createTipoExistenciaCont, deleteTipoExistenciaCont } = require("../../controllers/productos/tipoExistenciasContControllers");

const getTipoExistenciaContHandler = async (req,res)=>{
    const results = await getAllTipoExistenciaCont();
    res.status(201).json(results);
};

const createTipoExistenciaContHandler = async (req,res)=>{
    let registroTipoExistenciaCont = req.body;
    try {
        const results = await createTipoExistenciaCont(registroTipoExistenciaCont);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteTipoExistenciaContHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteTipoExistenciaCont(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getTipoExistenciaContHandler, createTipoExistenciaContHandler, deleteTipoExistenciaContHandler};
