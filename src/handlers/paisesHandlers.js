const { getAllPais } = require("../controllers/paisesControllers");

const getPaisHandler = async (req,res)=>{
    const results = await getAllPais();
    res.status(201).json(results);
};

module.exports ={getPaisHandler}
