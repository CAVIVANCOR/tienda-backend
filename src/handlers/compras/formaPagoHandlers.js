const { getAllFormaPago, createFormaPago, deleteFormaPago } = require("../../controllers/compras/formaPagoControllers");

const getFormaPagoHandler = async (req,res)=>{
    const results = await getAllFormaPago();
    res.status(201).json(results);
};

const createFormaPagoHandler = async (req,res)=>{
    let registroFormaPago = req.body;
    try {
        const results = await createFormaPago(registroFormaPago);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteFormaPagoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteFormaPago(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getFormaPagoHandler, createFormaPagoHandler, deleteFormaPagoHandler};
