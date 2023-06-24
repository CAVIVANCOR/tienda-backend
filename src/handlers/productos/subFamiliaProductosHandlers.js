const { getAllSubFamiliaProducto, createSubFamiliaProducto, deleteSubFamiliaProducto, updateSubFamiliaProducto } = require("../../controllers/productos/subFamiliaProductosControllers");

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

const deleteSubFamiliaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteSubFamiliaProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateSubFamiliaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroSubFamiliaProducto = req.body;
    try {
        const results = await updateSubFamiliaProducto(id,registroSubFamiliaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getSubFamiliaProductoHandler, createSubFamiliaProductoHandler, deleteSubFamiliaProductoHandler, updateSubFamiliaProductoHandler};
