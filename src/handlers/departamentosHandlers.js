const { getAllDepartamento } = require("../controllers/departamentosControllers");

const getDepartamentoHandler = async (req,res)=>{
    const results = await getAllDepartamento();
    res.status(201).json(results);
};

module.exports ={getDepartamentoHandler}
