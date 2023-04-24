const { getAllTDI } = require("../../controllers/clientesProveedores/tipoDocIdentidadControllers");

const getTDIHandler = async (req,res)=>{
    const results = await getAllTDI();
    res.status(201).json(results);
};

module.exports ={getTDIHandler}
