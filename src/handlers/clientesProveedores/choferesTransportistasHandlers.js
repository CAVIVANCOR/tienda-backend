const { getAllChoferTransportista } = require("../../controllers/clientesProveedores/choferTransportistaControllers");

const getChoferTransportistaHandler = async (req,res)=>{
    const results = await getAllChoferTransportista();
    res.status(201).json(results);
};

module.exports ={getChoferTransportistaHandler}
