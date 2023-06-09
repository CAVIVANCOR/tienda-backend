const { getAllProducto, createProducto } = require("../../controllers/productos/productosControllers");

const getProductoHandler = async (req,res)=>{
    const results = await getAllProducto();
    res.status(201).json(results);
};

const createProductoHandler = async (req,res)=>{
    let registroProducto = req.body;
    try {
        const results = await createProducto(registroProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getProductoHandler, createProductoHandler};
