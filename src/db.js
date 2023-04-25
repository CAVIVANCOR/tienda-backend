//**Crea la conexion con la base de datos (con sequelize) */
const {Sequelize} = require("sequelize");
require("dotenv").config();
const {DB_USER, DB_PASSWORD, DB_HOST, SERVER_PORT} = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tienda`,{logging:false});

//**Definicion de modelos (con sequelize)*/
//**PRODUCTOS */
const ProductoModel = require("./models/productos/Producto");
const FamiliaProductoModel = require("./models/productos/FamiliaProducto");
const SubFamiliaProductoModel = require("./models/productos/SubFamiliaProducto");
const AnoProductoModel = require("./models/productos/AnoProducto");
const ColorProductoModel = require("./models/productos/ColorProducto");
const LadoProductoModel = require("./models/productos/LadoProducto");
const MarcaProductoModel = require("./models/productos/MarcaProducto");
const MaterialProductoModel = require("./models/productos/MaterialProducto");
const ModeloMarcaProductoModel = require("./models/productos/ModeloMarcaProducto");
const ProcedenciaProductoModel = require("./models/productos/ProcedenciaProducto");
const TipoExistenciaContModel = require("./models/productos/TipoExistenciaCont");
const UMProductoModel = require("./models/productos/UMProducto");

//**CLIENTES PROVEEDORES */
const ClienteProveedorModel = require("./models/clientesProveedores/ClienteProveedor");
const ChoferTransportistaModel = require("./models/clientesProveedores/ChoferTransportista");
const ContactosCliProvModel = require("./models/clientesProveedores/ContactosCliProv");
const DepartamentoUbigeoModel = require("./models/clientesProveedores/DepartamentoUbigeo");
const DireccionesCliProvModel = require("./models/clientesProveedores/DireccionesCliProv");
const DistritoUbigeoModel = require("./models/clientesProveedores/DistritoUbigeo");
const PaisUbigeoModel = require("./models/clientesProveedores/PaisUbigeo");
const PreciosCliProvModel = require("./models/clientesProveedores/PreciosCliProv");
const ProvinciaUbigeoModel = require("./models/clientesProveedores/ProvinciaUbigeo");
const TipoDocIdentidadModel = require("./models/clientesProveedores/TipoDocIdentidad");
const TransportistaCliProvModel = require("./models/clientesProveedores/TransportistaCliProv");
const CuentasBancariasCliProvModel = require("./models/clientesProveedores/CuentasBancariasCliProv");
const BancosProvModel = require("./models/clientesProveedores/Bancos");
const TipoCliProvModel = require("./models/clientesProveedores/TipoCliProv");

//**USUARIOS ACCESOS */
const AccesoModel = require("./models/usuarios/Acceso");
const ModuloModel = require("./models/usuarios/Modulo");
const PersonalModel = require("./models/usuarios/Personal");
const RolModel = require("./models/usuarios/Rol");
const SubModuloModel = require("./models/usuarios/SubModulo");
const UsuarioModel = require("./models/usuarios/Usuario");

//**TABLAS GLOBALES */
const CorrelativoDocModel = require("./models/tablas/CorrelativoDoc");
const DatoGlobalModel = require("./models/tablas/DatoGlobal");
const EstadoDocModel = require("./models/tablas/EstadoDoc");
const TipoCambioModel = require("./models/tablas/TipoCambio");
const TipoDocumentoModel = require("./models/tablas/TipoDocumento");
const GrupoCentroCostosModel = require("./models/tablas/GrupoCentroCostos");
const SubGrupoCentroCostoModel = require("./models/tablas/SubGrupoCentroCosto");
const CentroCostoModel = require("./models/tablas/CentroCosto");

/**Instancias que definen los modelos, crea el .models: */
//**PRODUCTOS */
ProductoModel(sequelize);
FamiliaProductoModel(sequelize);
SubFamiliaProductoModel(sequelize);
AnoProductoModel(sequelize);
ColorProductoModel(sequelize);
LadoProductoModel(sequelize);
MarcaProductoModel(sequelize);
MaterialProductoModel(sequelize);
ModeloMarcaProductoModel(sequelize);
ProcedenciaProductoModel(sequelize);
TipoExistenciaContModel(sequelize);
UMProductoModel(sequelize);

//**CLIENTES PROVEEDORES */
ClienteProveedorModel(sequelize);
ChoferTransportistaModel(sequelize);
ContactosCliProvModel(sequelize);
DepartamentoUbigeoModel(sequelize);
DireccionesCliProvModel(sequelize);
DistritoUbigeoModel(sequelize);
PaisUbigeoModel(sequelize);
PreciosCliProvModel(sequelize);
ProvinciaUbigeoModel(sequelize);
TipoDocIdentidadModel(sequelize);
TransportistaCliProvModel(sequelize);
CuentasBancariasCliProvModel(sequelize);
BancosProvModel(sequelize);
TipoCliProvModel(sequelize);

//**USUARIOS ACCESOS */
UsuarioModel(sequelize);
AccesoModel(sequelize);
ModuloModel(sequelize);
SubModuloModel(sequelize);
RolModel(sequelize);
PersonalModel(sequelize);

//**TABLAS GLOBALES */
CorrelativoDocModel(sequelize);
DatoGlobalModel(sequelize);
EstadoDocModel(sequelize);
TipoCambioModel(sequelize);
TipoDocumentoModel(sequelize);
CentroCostoModel(sequelize);
GrupoCentroCostosModel(sequelize)
SubGrupoCentroCostoModel(sequelize)

//**Relacionar los Modelos */
const  {Producto, FamiliaProducto, SubFamiliaProducto, AnoProducto, ColorProducto, LadoProducto, MarcaProducto, 
        MaterialProducto, ModeloMarcaProducto, ProcedenciaProducto, TipoExistenciaCont, UMProducto,
        ClienteProveedor, ChoferTransportista, ContactosCliProv, DepartamentoUbigeo, DireccionesCliProv, 
        DistritoUbigeo, PaisUbigeo, PreciosCliProv, ProvinciaUbigeo, TipoDocIdentidad, TransportistaCliProv,
        CuentasBancariasCliProv, Bancos, Usuario, Acceso, Modulo, SubModulo, Rol, Personal,
        CorrelativoDoc, DatoGlobal, EstadoDoc, TipoCambio, TipoDocumento, CentroCosto, 
        GrupoCentroCostos, SubGrupoCentroCosto, TipoCliProv} = sequelize.models;

//**PRODUCTOS */
SubFamiliaProducto.hasMany(Producto);
Producto.belongsTo(SubFamiliaProducto);
AnoProducto.hasMany(Producto);
Producto.belongsTo(AnoProducto);
ColorProducto.hasMany(Producto);
Producto.belongsTo(ColorProducto);
LadoProducto.hasMany(Producto);
Producto.belongsTo(LadoProducto);
MaterialProducto.hasMany(Producto);
Producto.belongsTo(MaterialProducto);
ProcedenciaProducto.hasMany(Producto);
Producto.belongsTo(ProcedenciaProducto);
TipoExistenciaCont.hasMany(Producto);
Producto.belongsTo(TipoExistenciaCont);
UMProducto.hasMany(Producto);
Producto.belongsTo(UMProducto);
ModeloMarcaProducto.hasMany(Producto);
Producto.belongsTo(ModeloMarcaProducto);

FamiliaProducto.hasMany(SubFamiliaProducto);
SubFamiliaProducto.belongsTo(FamiliaProducto);

MarcaProducto.hasMany(ModeloMarcaProducto);
ModeloMarcaProducto.belongsTo(MarcaProducto);

//**CLIENTES PROVEEDORES */
TipoDocIdentidad.hasMany(ClienteProveedor);
ClienteProveedor.belongsTo(TipoDocIdentidad);

TipoCliProv.hasMany(ClienteProveedor);
ClienteProveedor.belongsTo(TipoCliProv);

ClienteProveedor.hasMany(ChoferTransportista);
ChoferTransportista.belongsTo(ClienteProveedor);

TipoDocIdentidad.hasMany(ChoferTransportista);
ChoferTransportista.belongsTo(TipoDocIdentidad);


ClienteProveedor.hasMany(ContactosCliProv);
ContactosCliProv.belongsTo(ClienteProveedor);

ClienteProveedor.hasMany(DireccionesCliProv);
DireccionesCliProv.belongsTo(ClienteProveedor);

ClienteProveedor.hasMany(PreciosCliProv);
PreciosCliProv.belongsTo(ClienteProveedor);

ClienteProveedor.hasMany(TransportistaCliProv);
TransportistaCliProv.belongsTo(ClienteProveedor);

TipoDocIdentidad.hasMany(TransportistaCliProv);
TransportistaCliProv.belongsTo(TipoDocIdentidad);

DistritoUbigeo.hasMany(DireccionesCliProv);
DireccionesCliProv.belongsTo(DistritoUbigeo);


ProvinciaUbigeo.hasMany(DistritoUbigeo);
DistritoUbigeo.belongsTo(ProvinciaUbigeo);

DepartamentoUbigeo.hasMany(ProvinciaUbigeo);
ProvinciaUbigeo.belongsTo(DepartamentoUbigeo);

PaisUbigeo.hasMany(DepartamentoUbigeo);
DepartamentoUbigeo.belongsTo(PaisUbigeo);

ClienteProveedor.hasMany(CuentasBancariasCliProv);
CuentasBancariasCliProv.belongsTo(ClienteProveedor);

Bancos.hasMany(CuentasBancariasCliProv);
CuentasBancariasCliProv.belongsTo(Bancos);

Modulo, SubModulo, Rol

//**USUARIOS ACCESOS */

Personal.hasMany(Usuario);
Usuario.belongsTo(Personal);

TipoDocIdentidad.hasMany(Personal);
Personal.belongsTo(TipoDocIdentidad);

Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

Usuario.hasMany(Acceso);
Acceso.belongsTo(Usuario);

SubModulo.hasMany(Acceso);
Acceso.belongsTo(SubModulo);

Modulo.hasMany(SubModulo);
SubModulo.belongsTo(Modulo);

//**TABLAS GLOBALES */

TipoDocumento.hasMany(CorrelativoDoc);
CorrelativoDoc.belongsTo(TipoDocumento);
GrupoCentroCostos.hasMany(SubGrupoCentroCosto);
SubGrupoCentroCosto.belongsTo(GrupoCentroCostos);
SubGrupoCentroCosto.hasMany(CentroCosto);
CentroCosto.belongsTo(SubGrupoCentroCosto);

TipoDocIdentidad.hasMany(DatoGlobal);
DatoGlobal.belongsTo(TipoDocIdentidad);


module.exports = {sequelize, SERVER_PORT, ...sequelize.models}
