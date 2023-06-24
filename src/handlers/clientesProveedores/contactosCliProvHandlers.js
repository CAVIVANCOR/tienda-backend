const { getAllContactosCliProv, createContactosCliProv, deleteContactosCliProv } = require("../../controllers/clientesProveedores/contactosCliProvControllers");

const getContactosCliProvHandler = async (req,res)=>{
    const results = await getAllContactosCliProv();
    res.status(201).json(results);
};

const createContactosCliProvHandler = async (req,res)=>{
    let registroContactosCliProv = req.body;
    try {
        const results = await createContactosCliProv(registroContactosCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteContactosCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteContactosCliProv(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getContactosCliProvHandler, createContactosCliProvHandler, deleteContactosCliProvHandler};
