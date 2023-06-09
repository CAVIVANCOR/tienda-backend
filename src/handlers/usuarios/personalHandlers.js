const { getAllPersonal, createPersona } = require("../../controllers/usuarios/personalControllers");

const getPersonalHandler = async (req,res)=>{
    const results = await getAllPersonal();
    res.status(201).json(results);
};

const createPersonalHandler = async (req,res)=>{
    let registroPersona = req.body;
    try {
        const results = await createPersona(registroPersona);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
module.exports ={getPersonalHandler,createPersonalHandler}