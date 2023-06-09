const { getAllTipoMovAlmacen, createTipoMovAlmacen, deleteTipoMovAlmacen } = require("../../controllers/almacen/tipoMovAlmacenControllers");

const getTipoMovAlmacenHandler = async (req,res)=>{
    const results = await getAllTipoMovAlmacen();
    res.status(201).json(results);
};

const createTipoMovAlmacenHandler = async (req,res)=>{
    let registroTipoMovAlmacen = req.body;
    try {
        const results = await createTipoMovAlmacen(registroTipoMovAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteTipoMovAlmacenHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const results = await deleteTipoMovAlmacen(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getTipoMovAlmacenHandler, createTipoMovAlmacenHandler, deleteTipoMovAlmacenHandler};
