const { getAllFamiliaProducto, createFamiliaProducto, deleteFamiliaProducto, updateFamiliaProducto, searchFamiliaProducto } = require("../../controllers/productos/familiaProductosControllers");

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
};

const updateFamiliaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroFamiliaProducto = req.body;
    try {
        const results = await updateFamiliaProducto(id,registroFamiliaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchFamiliaProductoHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchFamiliaProducto(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getFamiliaProductoHandler, createFamiliaProductoHandler, deleteFamiliaProductoHandler, updateFamiliaProductoHandler, searchFamiliaProductoHandler};
