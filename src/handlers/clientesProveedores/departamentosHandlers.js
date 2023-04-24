const { getAllDepartamento } = require("../../controllers/clientesProveedores/departamentosControllers");

const getDepartamentoHandler = async (req,res)=>{
    const results = await getAllDepartamento();
    res.status(201).json(results);
};

module.exports ={getDepartamentoHandler}
