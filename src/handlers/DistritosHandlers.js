const { getAllDistrito } = require("../controllers/distritosControllers");

const getDistritoHandler = async (req,res)=>{
    const results = await getAllDistrito();
    res.status(201).json(results);
};

module.exports ={getDistritoHandler}
