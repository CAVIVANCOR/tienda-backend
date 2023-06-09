const { getAllLadoProducto, createLadoProducto } = require("../../controllers/productos/ladoProductosControllers");

const getLadoProductoHandler = async (req,res)=>{
    const results = await getAllLadoProducto();
    res.status(201).json(results);
};

const createLadoProductoHandler = async (req,res)=>{
    let registroLadoProducto = req.body;
    try {
        const results = await createLadoProducto(registroLadoProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getLadoProductoHandler, createLadoProductoHandler};
