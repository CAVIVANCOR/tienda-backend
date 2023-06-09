const { getAllUbicacionFisicaAlmacen, createUbicacionFisicaAlmacen, deleteUbicacionFisicaAlmacen } = require("../../controllers/almacen/ubicacionFisicaAlmacen");

const getUbicacionFisicaAlmacenHandler = async (req,res)=>{
    const results = await getAllUbicacionFisicaAlmacen();
    res.status(201).json(results);
};

const createUbicacionFisicaAlmacenHandler = async (req,res)=>{
    let registroUbicacionFisicaAlmacen = req.body;
    try {
        const results = await createUbicacionFisicaAlmacen(registroUbicacionFisicaAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteUbicacionFisicaAlmacenHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const results = await deleteUbicacionFisicaAlmacen(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getUbicacionFisicaAlmacenHandler, createUbicacionFisicaAlmacenHandler, deleteUbicacionFisicaAlmacenHandler};
