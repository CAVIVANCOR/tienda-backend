const { getAllKardexAlmacen, createKardexAlmacen, deleteKardexAlmacen } = require("../../controllers/almacen/kardexAlmacenControllers");

const getKardexAlmacenHandler = async (req,res)=>{
    const results = await getAllKardexAlmacen();
    res.status(201).json(results);
};

const createKardexAlmacenHandler = async (req,res)=>{
    let registroKardexAlmacen = req.body;
    try {
        const results = await createKardexAlmacen(registroKardexAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteKardexAlmacenHandler = async (req,res)=>{
    const {idDetMovAlmacen} = req.params;
    try {
        const results = await deleteKardexAlmacen(idDetMovAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getKardexAlmacenHandler, createKardexAlmacenHandler , deleteKardexAlmacenHandler};