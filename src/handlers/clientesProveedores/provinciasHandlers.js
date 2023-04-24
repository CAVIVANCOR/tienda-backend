const { getAllProvincia } = require("../../controllers/clientesProveedores/provinciasControllers");

const getProvinciaHandler = async (req,res)=>{
    const results = await getAllProvincia();
    res.status(201).json(results);
};

module.exports ={getProvinciaHandler}
