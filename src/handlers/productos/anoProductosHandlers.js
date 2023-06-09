const { getAllAnoProducto, createAnoProducto } = require("../../controllers/productos/anoProductosControllers");

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

module.exports ={getAnoProductoHandler, createAnoProductoHandler};
