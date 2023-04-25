const { getAllContactosCliProv } = require("../../controllers/clientesProveedores/contactosCliProvControllers");

const getContactosCliProvHandler = async (req,res)=>{
    const results = await getAllContactosCliProv();
    res.status(201).json(results);
};

module.exports ={getContactosCliProvHandler}
