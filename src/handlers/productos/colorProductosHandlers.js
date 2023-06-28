const { getAllColorProducto, createColorProducto, deleteColorProducto, updateColorProducto, searchColorProducto } = require("../../controllers/productos/colorProductosControllers");

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

const deleteColorProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteColorProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateColorProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroColorProducto = req.body;
    try {
        const results = await updateColorProducto(id,registroColorProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchColorProductoHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchColorProducto(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getColorProductoHandler, createColorProductoHandler, deleteColorProductoHandler, updateColorProductoHandler, searchColorProductoHandler};
