const { getAllDepartamento, createDepartamento, deleteDepartamento } = require("../../controllers/clientesProveedores/departamentosControllers");

const getDepartamentoHandler = async (req,res)=>{
    const results = await getAllDepartamento();
    res.status(201).json(results);
};

const createDepartamentoHandler = async (req,res)=>{
    let registroDepartamento = req.body;
    try {
        const results = await createDepartamento(registroDepartamento);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteDepartamentoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteDepartamento(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDepartamentoHandler, createDepartamentoHandler, deleteDepartamentoHandler};
