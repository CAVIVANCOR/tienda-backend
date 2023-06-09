const { getAllDirCliProv, createDirCliProv, deleteDirCliProv, updateDirCliProv, searchDirCliProv } = require("../../controllers/clientesProveedores/dirCliProvControllers");

const getDirCliProvHandler = async (req,res)=>{
    const results = await getAllDirCliProv();
    res.status(201).json(results);
};

const createDirCliProvHandler = async (req,res)=>{
    let registroDirCliProv = req.body;
    try {
        const results = await createDirCliProv(registroDirCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteDirCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteDirCliProv(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateDirCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    let registroDirCliProv = req.body;
    try {
        const results = await updateDirCliProv(id,registroDirCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchDirCliProvHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchDirCliProv(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDirCliProvHandler, createDirCliProvHandler, deleteDirCliProvHandler, updateDirCliProvHandler, searchDirCliProvHandler};
