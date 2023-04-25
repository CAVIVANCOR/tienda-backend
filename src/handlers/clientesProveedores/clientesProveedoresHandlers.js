const { getAllClienteProveedor } = require("../../controllers/clientesProveedores/clienteProveedorControllers");

const getClienteProveedorHandler = async (req,res)=>{
    const results = await getAllClienteProveedor();
    res.status(201).json(results);
};

module.exports ={getClienteProveedorHandler}
