const { getAllEstadoProducto, createEstadoProducto, deleteEstadoProducto, updateEstadoProducto, searchEstadoProducto } = require("../../controllers/productos/estadoProductosControllers");

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

const deleteEstadoProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteEstadoProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateEstadoProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroEstadoProducto = req.body;
    try {
        const results = await updateEstadoProducto(id,registroEstadoProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchEstadoProductoHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchEstadoProducto(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getEstadoProductoHandler, createEstadoProductoHandler, deleteEstadoProductoHandler, updateEstadoProductoHandler, searchEstadoProductoHandler};
