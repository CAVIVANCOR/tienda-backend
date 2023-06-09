const { getAllEstadoProducto, createEstadoProducto } = require("../../controllers/productos/estadoProductosControllers");

const getEstadoProductoHandler = async (req,res)=>{
    const results = await getAllEstadoProducto();
    res.status(201).json(results);
};

const createEstadoProductoHandler = async (req,res)=>{
    let registroEstadoProducto = req.body;
    try {
        const results = await createEstadoProducto(registroEstadoProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getEstadoProductoHandler, createEstadoProductoHandler};
