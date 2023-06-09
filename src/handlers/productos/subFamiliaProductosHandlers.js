const { getAllSubFamiliaProducto, createSubFamiliaProducto } = require("../../controllers/productos/subFamiliaProductosControllers");

const getSubFamiliaProductoHandler = async (req,res)=>{
    const results = await getAllSubFamiliaProducto();
    res.status(201).json(results);
};

const createSubFamiliaProductoHandler = async (req,res)=>{
    let registroSubFamiliaProducto = req.body;
    try {
        const results = await createSubFamiliaProducto(registroSubFamiliaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getSubFamiliaProductoHandler, createSubFamiliaProductoHandler};
