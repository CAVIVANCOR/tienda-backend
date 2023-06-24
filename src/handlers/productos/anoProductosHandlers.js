const { getAllAnoProducto, createAnoProducto, deleteAnoProducto, updateAnoProducto } = require("../../controllers/productos/anoProductosControllers");

const getAnoProductoHandler = async (req,res)=>{
    const results = await getAllAnoProducto();
    res.status(201).json(results);
};

const createAnoProductoHandler = async (req,res)=>{
    let registroAnoProducto = req.body;
    try {
        const results = await createAnoProducto(registroAnoProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteAnoProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteAnoProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateAnoProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroAnoProducto = req.body;
    try {
        const results = await updateAnoProducto(id,registroAnoProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getAnoProductoHandler, createAnoProductoHandler, deleteAnoProductoHandler, updateAnoProductoHandler};
