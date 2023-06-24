const { getAllMaterialProducto, createMaterialProducto, deleteMaterialProducto, updateMaterialProducto } = require("../../controllers/productos/materialProductosControllers");

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

const deleteMaterialProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteMaterialProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateMaterialProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroMaterialProducto = req.body;
    try {
        const results = await updateMaterialProducto(id,registroMaterialProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getMaterialProductoHandler, createMaterialProductoHandler, deleteMaterialProductoHandler, updateMaterialProductoHandler};
