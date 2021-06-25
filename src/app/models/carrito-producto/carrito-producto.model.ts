export class CarritoProducto {
  constructor(
    public carrito_Id?: number,
    public productoId?: string,
    public cantidad?: number,
    public productos?: []
    ){}
}