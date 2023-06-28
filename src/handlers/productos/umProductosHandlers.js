const { getAllUMProducto, createUMProducto, deleteUMProducto, updateUMProducto, searchUMProducto } = require("../../controllers/productos/umProductosControllers");

const getUMProductoHandler = async (req,res)=>{
    const results = await getAllUMProducto();
    res.status(201).json(results);
};

const createUMProductoHandler = async (req,res)=>{
    let registroUMProducto = req.body;
    try {
        const results = await createUMProducto(registroUMProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteUMProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteUMProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateUMProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroUMProducto = req.body;
    try {
        const results = await updateUMProducto(id,registroUMProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchUMProductoHandler = async (req,res)=>{
    let registroUMProducto = req.body;
    try {
        const results = await searchUMProducto(registroUMProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getUMProductoHandler, createUMProductoHandler, deleteUMProductoHandler, updateUMProductoHandler, searchUMProductoHandler};
