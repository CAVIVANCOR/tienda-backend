const { getAllModeloMarcaProducto, createModeloMarcaProducto, deleteModeloMarcaProducto } = require("../../controllers/productos/modeloMarcaProductosControllers");

const getModeloMarcaProductoHandler = async (req,res)=>{
    const results = await getAllModeloMarcaProducto();
    res.status(201).json(results);
};

const createModeloMarcaProductoHandler = async (req,res)=>{
    let registroModeloMarcaProducto = req.body;
    try {
        const results = await createModeloMarcaProducto(registroModeloMarcaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteModeloMarcaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteModeloMarcaProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getModeloMarcaProductoHandler, createModeloMarcaProductoHandler, deleteModeloMarcaProductoHandler};
