const { getAllMaterialProducto, createMaterialProducto } = require("../../controllers/productos/materialProductosControllers");

const getMaterialProductoHandler = async (req,res)=>{
    const results = await getAllMaterialProducto();
    res.status(201).json(results);
};

const createMaterialProductoHandler = async (req,res)=>{
    let registroMaterialProducto = req.body;
    try {
        const results = await createMaterialProducto(registroMaterialProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getMaterialProductoHandler, createMaterialProductoHandler};
