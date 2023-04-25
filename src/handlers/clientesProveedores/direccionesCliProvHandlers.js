const { getAllDireccionesCliProv } = require("../../controllers/clientesProveedores/direccionesCliProvControllers");

const getDireccionesCliProvHandler = async (req,res)=>{
    const results = await getAllDireccionesCliProv();
    res.status(201).json(results);
};

module.exports ={getDireccionesCliProvHandler}
