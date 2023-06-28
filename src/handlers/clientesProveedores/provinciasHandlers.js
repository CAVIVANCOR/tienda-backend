const { getAllProvincia, createProvicias, deleteProvincias, updateProvincias, searchProvincias } = require("../../controllers/clientesProveedores/provinciasControllers");

const getProvinciaHandler = async (req,res)=>{
    const results = await getAllProvincia();
    res.status(201).json(results);
};

const createProvinciaHandler = async (req,res)=>{
    let registroProvincia = req.body;
    try {
        const results = await createProvicias(registroProvincia);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteProvinciasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteProvincias(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateProvinciasHandler = async (req,res)=>{
    const id = req.params.id;
    let registroProvincia = req.body;
    try {
        const results = await updateProvincias(id,registroProvincia);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchProvinciasHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchProvincias(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getProvinciaHandler,  createProvinciaHandler, deleteProvinciasHandler, updateProvinciasHandler, searchProvinciasHandler};
