const { getAllMarcaProducto, createMarcaProducto, deleteMarcaProducto, updateMarcaProducto, searchMarcaProducto } = require("../../controllers/productos/marcaProductosControllers");

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

const deleteMarcaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteMarcaProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateMarcaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroMarcaProducto = req.body;
    try {
        const results = await updateMarcaProducto(id,registroMarcaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchMarcaProductoHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchMarcaProducto(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getMarcaProductoHandler, createMarcaProductoHandler, deleteMarcaProductoHandler, updateMarcaProductoHandler, searchMarcaProductoHandler};
