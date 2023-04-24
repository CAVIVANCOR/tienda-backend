const { getAllBancos } = require("../../controllers/clientesProveedores/bancosControllers");

const getBancosHandler = async (req,res)=>{
    const results = await getAllBancos();
    res.status(201).json(results);
};

module.exports ={getBancosHandler}
