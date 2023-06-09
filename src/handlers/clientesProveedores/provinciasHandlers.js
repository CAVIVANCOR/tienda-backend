const { getAllProvincia, createProvicias } = require("../../controllers/clientesProveedores/provinciasControllers");

const getProvinciaHandler = async (req,res)=>{
    const results = await getAllProvincia();
    res.status(201).json(results);
};

const createProvinciaHandler = async (req,res)=>{
    let registroProvincia = req.body;
    try {
        const results = await createProvicias(registroProvincia);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getProvinciaHandler,  createProvinciaHandler};
