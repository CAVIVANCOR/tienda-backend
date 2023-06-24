const { getAllBancos, createBancos, deleteBanco } = require("../../controllers/clientesProveedores/bancosControllers");

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

const deleteBancoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteBanco(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getBancosHandler, createBancosHandler, deleteBancoHandler};
