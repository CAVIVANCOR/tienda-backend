const { getAllMarcaProducto, createMarcaProducto } = require("../../controllers/productos/marcaProductosControllers");

const getMarcaProductoHandler = async (req,res)=>{
    const results = await getAllMarcaProducto();
    res.status(201).json(results);
};

const createMarcaProductoHandler = async (req,res)=>{
    let registroMarcaProducto = req.body;
    try {
        const results = await createMarcaProducto(registroMarcaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getMarcaProductoHandler, createMarcaProductoHandler};
