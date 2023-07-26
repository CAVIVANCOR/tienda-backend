//**Crea la conexion con la base de datos (con sequelize) */
const {Sequelize} = require("sequelize");
require("dotenv").config();
const {DB_USER, DB_PASSWORD, DB_HOST, SERVER_PORT} = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tienda`,{
        logging:false, 
        dialectOptions:{
                requestTimeout:30000,
                decimalNumbers:true},
        parse: {
                timezone: 'America/Lima'
        }
});

//**Definicion de modelos (con sequelize)*/
//** CAJAYBANCOS */
const ConceptoMovCModel=require("./models/cajaybancos/ConceptoMovC")
const CuentasModel=require("./models/cajaybancos/Cuentas")
const DetMovCuentasModel=require("./models/cajaybancos/DetMovCuentas")
const KardexCuentasModel=require("./models/cajaybancos/KardexCuentas")


//**COMPRAS */
const FormaPagoModel =require("./models/compras/FormaPago");
const DetComprasModel = require("./models/compras/DetCompras");
const CabComprasModel = require("./models/compras/CabCompras");

//**VENTAS */
const DetVentasModel = require("./models/ventas/DetVentas");
const CabVentasModel = require("./models/ventas/CabVentas");


//**PRODUCTOS */
const ProductoModel = require("./models/productos/Producto");
const EstadoProdModel = require("./models/productos/EstadoProd");
const FamiliaModel = require("./models/productos/Familia");
const SubFamiliaModel = require("./models/productos/SubFamilia");
const AnoModel = require("./models/productos/Ano");
const ColoreModel = require("./models/productos/Colore");
const LadoModel = require("./models/productos/Lado");
const MarcaModel = require("./models/productos/Marca");
const MaterialeModel = require("./models/productos/Materiale");
const ModeloMarcaModel = require("./models/productos/ModeloMarca");
const ProcedenciaModel = require("./models/productos/Procedencia");
const TipoExisContModel = require("./models/productos/TipoExisCont");
const UMProdModel = require("./models/productos/UMProd");

//**CLIENTES PROVEEDORES */
const ClienteProveedorModel = require("./models/clientesProveedores/ClienteProveedor");
const ChoferModel = require("./models/clientesProveedores/Chofer");
const ContactosCliProvModel = require("./models/clientesProveedores/ContactosCliProv");
const DepartamentoModel = require("./models/clientesProveedores/Departamento");
const DirCliProvModel = require("./models/clientesProveedores/DirCliProv");
const DistritoModel = require("./models/clientesProveedores/Distrito");
const PaisModel = require("./models/clientesProveedores/Pais");
const PreciosCliProvModel = require("./models/clientesProveedores/PreciosCliProv");
const ProvinciaModel = require("./models/clientesProveedores/Provincia");
const TipoDocIdentidadModel = require("./models/clientesProveedores/TipoDocIdentidad");
const TransportistaCliProvModel = require("./models/clientesProveedores/TransportistaCliProv");
const CBancariasCliProvModel = require("./models/clientesProveedores/CBancariasCliProv");
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

//**ALMACEN */
const AlmacenModel = require("./models/almacen/Almacen");
const CabMovAlmacenModel = require("./models/almacen/CabMovAlmacen");
const ConceptoAlmacenModel = require("./models/almacen/ConceptoAlmacen");
const DetMovAlmacenModel = require("./models/almacen/DetMovAlmacen");
const TipoMovAlmacenModel = require("./models/almacen/TipoMovAlmacen");
const UbicaAlmacenModel = require("./models/almacen/UbicaAlmacen");
const KardexAlmacenModel = require("./models/almacen/KardexAlmacen");

/**Instancias que definen los modelos, crea el .models: */

//**CAJA Y BANCOS */
ConceptoMovCModel(sequelize);
CuentasModel(sequelize);
DetMovCuentasModel(sequelize);
KardexCuentasModel(sequelize);

//**COMPRAS */
FormaPagoModel(sequelize);
CabComprasModel(sequelize);
DetComprasModel(sequelize);

//**VENTAS */
CabVentasModel(sequelize);
DetVentasModel(sequelize);

//**ALMACEN */
AlmacenModel(sequelize);
CabMovAlmacenModel(sequelize);
ConceptoAlmacenModel(sequelize);
DetMovAlmacenModel(sequelize);
TipoMovAlmacenModel(sequelize);
UbicaAlmacenModel(sequelize);
KardexAlmacenModel(sequelize);

//**PRODUCTOS */
ProductoModel(sequelize);
EstadoProdModel(sequelize);
FamiliaModel(sequelize);
SubFamiliaModel(sequelize);
AnoModel(sequelize);
ColoreModel(sequelize);
LadoModel(sequelize);
MarcaModel(sequelize);
MaterialeModel(sequelize);
ModeloMarcaModel(sequelize);
ProcedenciaModel(sequelize);
TipoExisContModel(sequelize);
UMProdModel(sequelize);

//**CLIENTES PROVEEDORES */
ClienteProveedorModel(sequelize);
ChoferModel(sequelize);
ContactosCliProvModel(sequelize);
DepartamentoModel(sequelize);
DirCliProvModel(sequelize);
DistritoModel(sequelize);
PaisModel(sequelize);
PreciosCliProvModel(sequelize);
ProvinciaModel(sequelize);
TipoDocIdentidadModel(sequelize);
TransportistaCliProvModel(sequelize);
CBancariasCliProvModel(sequelize);
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
const  {Producto, EstadoProd, Familia, SubFamilia, Ano, Colore, Lado, 
        Marca, Materiale, ModeloMarca, Procedencia, TipoExisCont, UMProd,
        ClienteProveedor, Chofer, ContactosCliProv, Departamento, DirCliProv, 
        Distrito, Pais, PreciosCliProv, Provincia, TipoDocIdentidad, TransportistaCliProv,
        CBancariasCliProv, Bancos, Usuario, Acceso, Modulo, SubModulo, Rol, Personal,
        CorrelativoDoc, DatoGlobal, EstadoDoc, TipoCambio, TipoDocumento, CentroCosto, 
        GrupoCentroCostos, SubGrupoCentroCosto, TipoCliProv, Almacen, CabMovAlmacen, ConceptoAlmacen, KardexAlmacen, 
        DetMovAlmacen, TipoMovAlmacen, UbicaAlmacen, FormaPago, DetCompras, CabCompras, 
        CabVentas, DetVentas, ConceptoMovC, Cuentas, DetMovCuentas, KardexCuentas} = sequelize.models;


//**PRODUCTOS */
SubFamilia.hasMany(Producto);
Producto.belongsTo(SubFamilia);
Ano.hasMany(Producto);
Producto.belongsTo(Ano);
Colore.hasMany(Producto);
Producto.belongsTo(Colore);
Lado.hasMany(Producto);
Producto.belongsTo(Lado);
Materiale.hasMany(Producto);
Producto.belongsTo(Materiale);
Procedencia.hasMany(Producto);
Producto.belongsTo(Procedencia);
TipoExisCont.hasMany(Producto);
Producto.belongsTo(TipoExisCont);
UMProd.hasMany(Producto);
Producto.belongsTo(UMProd);
ModeloMarca.hasMany(Producto);
Producto.belongsTo(ModeloMarca);

Familia.hasMany(SubFamilia);
SubFamilia.belongsTo(Familia);

Marca.hasMany(ModeloMarca);
ModeloMarca.belongsTo(Marca);

//**CLIENTES PROVEEDORES */
TipoDocIdentidad.hasMany(ClienteProveedor);
ClienteProveedor.belongsTo(TipoDocIdentidad);

TipoCliProv.hasMany(ClienteProveedor);
ClienteProveedor.belongsTo(TipoCliProv);

ClienteProveedor.hasMany(Chofer);
Chofer.belongsTo(ClienteProveedor);

// TipoDocIdentidad.hasMany(Chofer);
// Chofer.belongsTo(TipoDocIdentidad);


ClienteProveedor.hasMany(ContactosCliProv);
ContactosCliProv.belongsTo(ClienteProveedor);

ClienteProveedor.hasMany(DirCliProv);
DirCliProv.belongsTo(ClienteProveedor);


ClienteProveedor.hasMany(TransportistaCliProv);
TransportistaCliProv.belongsTo(ClienteProveedor);

Distrito.hasMany(DirCliProv);
DirCliProv.belongsTo(Distrito);

Provincia.hasMany(Distrito);
Distrito.belongsTo(Provincia);

Departamento.hasMany(Provincia);
Provincia.belongsTo(Departamento);

Pais.hasMany(Departamento);
Departamento.belongsTo(Pais);

ClienteProveedor.hasMany(CBancariasCliProv);
CBancariasCliProv.belongsTo(ClienteProveedor);

Bancos.hasMany(CBancariasCliProv);
CBancariasCliProv.belongsTo(Bancos);

//**USUARIOS ACCESOS */

Personal.hasMany(Usuario);
Usuario.belongsTo(Personal);

TipoDocIdentidad.hasMany(Personal);
Personal.belongsTo(TipoDocIdentidad);

Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

Usuario.hasMany(Acceso);
Acceso.belongsTo(Usuario);

Almacen.hasMany(Usuario);
Usuario.belongsTo(Almacen);

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

//**ALMACEN */
CabMovAlmacen.hasMany(DetMovAlmacen);
DetMovAlmacen.belongsTo(CabMovAlmacen);

ConceptoAlmacen.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(ConceptoAlmacen);

CentroCosto.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(CentroCosto);

ClienteProveedor.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(ClienteProveedor);

EstadoDoc.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(EstadoDoc);

CorrelativoDoc.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(CorrelativoDoc);

TipoCambio.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(TipoCambio);

TipoMovAlmacen.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(TipoMovAlmacen);

Usuario.hasMany(CabMovAlmacen);
CabMovAlmacen.belongsTo(Usuario);

Producto.hasMany(DetMovAlmacen);
DetMovAlmacen.belongsTo(Producto);

EstadoProd.hasMany(DetMovAlmacen);
DetMovAlmacen.belongsTo(EstadoProd);

Distrito.hasMany(Almacen);
Almacen.belongsTo(Distrito);

Almacen.hasMany(UbicaAlmacen);
UbicaAlmacen.belongsTo(Almacen);

TipoMovAlmacen.hasMany(ConceptoAlmacen);
ConceptoAlmacen.belongsTo(TipoMovAlmacen);

Producto.hasMany(KardexAlmacen);
KardexAlmacen.belongsTo(Producto);

ClienteProveedor.hasMany(KardexAlmacen);
KardexAlmacen.belongsTo(ClienteProveedor);

UbicaAlmacen.hasMany(KardexAlmacen);
KardexAlmacen.belongsTo(UbicaAlmacen);

EstadoProd.hasMany(KardexAlmacen);
KardexAlmacen.belongsTo(EstadoProd);


//**COMPRAS */
CabCompras.hasMany(DetCompras);
DetCompras.belongsTo(CabCompras);

CorrelativoDoc.hasMany(CabCompras);
CabCompras.belongsTo(CorrelativoDoc);

ClienteProveedor.hasMany(CabCompras);
CabCompras.belongsTo(ClienteProveedor);

FormaPago.hasMany(CabCompras);
CabCompras.belongsTo(FormaPago);

EstadoDoc.hasMany(CabCompras);
CabCompras.belongsTo(EstadoDoc);

Usuario.hasMany(CabCompras);
CabCompras.belongsTo(Usuario);

TipoCambio.hasMany(CabCompras);
CabCompras.belongsTo(TipoCambio);

CentroCosto.hasMany(CabCompras);
CabCompras.belongsTo(CentroCosto);

Producto.hasMany(DetCompras);
DetCompras.belongsTo(Producto);

EstadoProd.hasMany(DetCompras);
DetCompras.belongsTo(EstadoProd);


//**VENTAS */
CabVentas.hasMany(DetVentas);
DetVentas.belongsTo(CabVentas);

ClienteProveedor.hasMany(CabVentas);
CabVentas.belongsTo(ClienteProveedor);

FormaPago.hasMany(CabVentas);
CabVentas.belongsTo(FormaPago);

EstadoDoc.hasMany(CabVentas);
CabVentas.belongsTo(EstadoDoc);

Usuario.hasMany(CabVentas);
CabVentas.belongsTo(Usuario);

TipoCambio.hasMany(CabVentas);
CabVentas.belongsTo(TipoCambio);

CentroCosto.hasMany(CabVentas);
CabVentas.belongsTo(CentroCosto);

CorrelativoDoc.hasMany(CabVentas);
CabVentas.belongsTo(CorrelativoDoc);

Producto.hasMany(DetVentas);
DetVentas.belongsTo(Producto);

EstadoProd.hasMany(DetVentas);
DetVentas.belongsTo(EstadoProd);


//**CAJA Y BANCOS */
ClienteProveedor.hasMany(DetMovCuentas);
DetMovCuentas.belongsTo(ClienteProveedor);

Usuario.hasMany(DetMovCuentas);
DetMovCuentas.belongsTo(Usuario);

EstadoDoc.hasMany(DetMovCuentas);
DetMovCuentas.belongsTo(EstadoDoc);

ConceptoMovC.hasMany(DetMovCuentas);
DetMovCuentas.belongsTo(ConceptoMovC);

Bancos.hasMany(DetMovCuentas);
DetMovCuentas.belongsTo(Bancos);

DetMovCuentas.hasMany(KardexCuentas);
KardexCuentas.belongsTo(DetMovCuentas);

Cuentas.hasMany(KardexCuentas);
KardexCuentas.belongsTo(Cuentas);

module.exports = {sequelize, SERVER_PORT, ...sequelize.models}
