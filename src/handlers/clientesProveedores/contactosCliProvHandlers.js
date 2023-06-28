const { getAllContactosCliProv, createContactosCliProv, deleteContactosCliProv, updateContactosCliProv, searchContactosCliProv } = require("../../controllers/clientesProveedores/contactosCliProvControllers");

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
};

const updateContactosCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    let registroContactosCliProv = req.body;
    try {
        const results = await updateContactosCliProv(id,registroContactosCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchContactosCliProvHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchContactosCliProv(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getContactosCliProvHandler, createContactosCliProvHandler, deleteContactosCliProvHandler, updateContactosCliProvHandler, searchContactosCliProvHandler};
