export class CarritoProducto {
  constructor(
    public carrito_Id?: string,
    public productoId?: string,
    public cantidad?: number,
    public productos?: []
    ){}
}