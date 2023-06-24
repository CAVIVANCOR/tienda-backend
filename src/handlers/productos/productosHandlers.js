const { getAllProducto, createProducto, deleteProducto, updateProducto } = require("../../controllers/productos/productosControllers");

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

const deleteProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroProducto = req.body;
    try {
        const results = await updateProducto(id,registroProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getProductoHandler, createProductoHandler, deleteProductoHandler, updateProductoHandler};
