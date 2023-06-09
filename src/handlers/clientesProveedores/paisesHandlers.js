const { getAllPais, createPais } = require("../../controllers/clientesProveedores/paisesControllers");

const getPaisHandler = async (req,res)=>{
    const results = await getAllPais();
    res.status(201).json(results);
};

const createPaisHandler = async (req,res)=>{
    let registroPais = req.body;
    try {
        const results = await createPais(registroPais);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getPaisHandler, createPaisHandler};
