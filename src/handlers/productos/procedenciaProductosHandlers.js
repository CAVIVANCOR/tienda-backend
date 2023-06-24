const { getAllProcedenciaProducto, createProcedenciaProducto, deleteProcedenciaProducto, updateProcedenciaProducto } = require("../../controllers/productos/procedenciaProductosControllers");

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

const deleteProcedenciaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteProcedenciaProducto(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateProcedenciaProductoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroProcedenciaProducto = req.body;
    try {
        const results = await updateProcedenciaProducto(id,registroProcedenciaProducto);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getProcedenciaProductoHandler, createProcedenciaProductoHandler, deleteProcedenciaProductoHandler, updateProcedenciaProductoHandler};
