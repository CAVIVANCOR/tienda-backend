const {DireccionesCliProv,DistritoUbigeo,ProvinciaUbigeo,DepartamentoUbigeo,PaisUbigeo} = require("../../db");

const getAllDireccionesCliProv= async ()=>{
    let databaseDireccionesCliProv = await DireccionesCliProv.findAll({
        include:[{
            model:DistritoUbigeo,
            attributes:["descripcion","codSunat","CodPostal"],
            include:[{
                model:ProvinciaUbigeo,
                attributes:["descripcion","codSunat"],
                include:[{
                    model:DepartamentoUbigeo,
                    attributes:["descripcion","codSunat"],
                        include:[{
                            model:PaisUbigeo,
                            attributes:["descripcion","codSunat"],
                            required:true
                        }]
                }]
            }]
        }]
    });
    return databaseDireccionesCliProv;
};


module.exports = {getAllDireccionesCliProv};

