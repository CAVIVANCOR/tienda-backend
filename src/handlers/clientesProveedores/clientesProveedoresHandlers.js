const { getAllClienteProveedor, createClienteProveedor, deleteClienteProveedor, updateClienteProveedor } = require("../../controllers/clientesProveedores/clienteProveedorControllers");

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

const deleteClienteProveedorHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteClienteProveedor(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateClienteProveedorHandler = async (req,res)=>{
    const id = req.params.id;
    let registroClienteProveedor = req.body;
    try {
        const results = await updateClienteProveedor(id,registroClienteProveedor);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getClienteProveedorHandler, createClienteProveedorHandler, deleteClienteProveedorHandler, updateClienteProveedorHandler};
