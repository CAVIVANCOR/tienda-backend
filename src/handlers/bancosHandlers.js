const { getAllBancos } = require("../controllers/bancosControllers");

const getBancosHandler = async (req,res)=>{
    const results = await getAllBancos();
    res.status(201).json(results);
};

module.exports ={getBancosHandler}
