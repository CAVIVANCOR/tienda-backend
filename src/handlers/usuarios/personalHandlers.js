const { getAllPersonal } = require("../../controllers/usuarios/personalControllers");

const getPersonalHandler = async (req,res)=>{
    const results = await getAllPersonal();
    res.status(201).json(results);
};

module.exports ={getPersonalHandler}