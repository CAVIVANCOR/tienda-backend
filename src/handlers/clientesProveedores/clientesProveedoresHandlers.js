const { getAllClienteProveedor, createClienteProveedor } = require("../../controllers/clientesProveedores/clienteProveedorControllers");

const getClienteProveedorHandler = async (req,res)=>{
    const results = await getAllClienteProveedor();
    res.status(201).json(results);
};

const createClienteProveedorHandler = async (req,res)=>{
    let registroClienteProveedor = req.body;
    try {
        const results = await createClienteProveedor(registroClienteProveedor);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getClienteProveedorHandler, createClienteProveedorHandler};
