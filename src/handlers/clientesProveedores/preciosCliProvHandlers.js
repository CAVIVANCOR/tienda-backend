const { getAllPreciosCliProv, createPreciosCliProv } = require("../../controllers/clientesProveedores/preciosCliProvControllers");

const getPreciosCliProvHandler = async (req,res)=>{
    const results = await getAllPreciosCliProv();
    res.status(201).json(results);
};

const createPreciosCliProvHandler = async (req,res)=>{
    let registroPreciosCliProv = req.body;
    try {
        const results = await createPreciosCliProv(registroPreciosCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getPreciosCliProvHandler, createPreciosCliProvHandler};
