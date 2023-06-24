const { getAllFamiliaProducto, createFamiliaProducto, deleteFamiliaProducto } = require("../../controllers/productos/familiaProductosControllers");

const getFamiliaProductoHandler = async (req,res)=>{
    const results = await getAllFamiliaProducto();
    res.status(201).json(results);
};

const createFamiliaProductoHandler = async (req,res)=>{
    let registroFamiliaProducto = req.body;
    try {
        const results = await createFamiliaProducto(registroFamiliaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteFamiliaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteFamiliaProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getFamiliaProductoHandler, createFamiliaProductoHandler, deleteFamiliaProductoHandler};
