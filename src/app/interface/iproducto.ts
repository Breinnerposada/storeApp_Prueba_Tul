export interface IProducto {
id: number,
descripcion: string,
nombre: string,
precio: number,
seccion_Producto: number,
sku: number,
url_image: string
}
export interface IProductoCarrito {
carritoId: string,
productoId: string,
productos: IProducto[]
}
