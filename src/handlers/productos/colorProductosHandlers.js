const { getAllColorProducto, createColorProducto } = require("../../controllers/productos/colorProductosControllers");

const getColorProductoHandler = async (req,res)=>{
    const results = await getAllColorProducto();
    res.status(201).json(results);
};

const createColorProductoHandler = async (req,res)=>{
    let registroColorProducto = req.body;
    try {
        const results = await createColorProducto(registroColorProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getColorProductoHandler, createColorProductoHandler};