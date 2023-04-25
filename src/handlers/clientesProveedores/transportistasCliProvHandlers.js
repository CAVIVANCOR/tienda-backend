const { getAllTransportistaCliProv } = require("../../controllers/clientesProveedores/transportistaCliProvControllers");

const getTransportistaCliProvHandler = async (req,res)=>{
    const results = await getAllTransportistaCliProv();
    res.status(201).json(results);
};

module.exports ={getTransportistaCliProvHandler}
