const { getAllUMProducto, createUMProducto } = require("../../controllers/productos/umProductosControllers");

const getUMProductoHandler = async (req,res)=>{
    const results = await getAllUMProducto();
    res.status(201).json(results);
};

const createUMProductoHandler = async (req,res)=>{
    let registroUMProducto = req.body;
    try {
        const results = await createUMProducto(registroUMProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getUMProductoHandler, createUMProductoHandler};