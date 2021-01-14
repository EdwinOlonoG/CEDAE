export interface Ifarmacia{
    idProductos: number;
    NomProd: string; /* Formulario */
    CadProd: Date; /* Formulario */
    PrecioProd: number; /* Formulario */
    ExistenciaProd: number; /* Formulario */
    Farmacia_idFarmacia: number;
    Farmacia_Sucursal_idSucursal: number;
}