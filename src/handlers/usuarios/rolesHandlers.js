const { getAllRoles } = require("../../controllers/usuarios/rolControllers");

const getRolesHandler = async (req,res)=>{
    const results = await getAllRoles();
    res.status(201).json(results);
};

module.exports ={getRolesHandler}