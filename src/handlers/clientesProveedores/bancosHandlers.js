const { getAllBancos, createBancos } = require("../../controllers/clientesProveedores/bancosControllers");

const getBancosHandler = async (req,res)=>{
    const results = await getAllBancos();
    res.status(201).json(results);
};

const createBancosHandler = async (req,res)=>{
    let registroBancos = req.body;
    try {
        const results = await createBancos(registroBancos);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getBancosHandler, createBancosHandler};
