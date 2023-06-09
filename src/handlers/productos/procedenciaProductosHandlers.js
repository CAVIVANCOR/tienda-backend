const { getAllProcedenciaProducto, createProcedenciaProducto } = require("../../controllers/productos/procedenciaProductosControllers");

const getProcedenciaProductoHandler = async (req,res)=>{
    const results = await getAllProcedenciaProducto();
    res.status(201).json(results);
};

const createProcedenciaProductoHandler = async (req,res)=>{
    let registroProcedenciaProducto = req.body;
    try {
        const results = await createProcedenciaProducto(registroProcedenciaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getProcedenciaProductoHandler, createProcedenciaProductoHandler};
