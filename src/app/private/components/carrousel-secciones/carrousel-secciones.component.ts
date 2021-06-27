import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel-secciones',
  templateUrl: './carrousel-secciones.component.html',
  styleUrls: ['./carrousel-secciones.component.scss']
})
export class CarrouselSeccionesComponent implements OnInit {

  pictures : any[] = [
    {
      nombre : "Promociones",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/b706e86a-ead3-491f-8dc6-33b5917440b3.png",
    },
    {
      nombre : "Comidas Rapidas",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/IFOOD_CO_COUSINES_FAST_FOOD.jpg",
    },
    {
      nombre : "Típica",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/IFOOD_CO_COUSINES_TIPICA.jpg",
    },
    {
      nombre : "Postres",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/IFOOD_CO_COUSINES_POSTRES.jpg",
    },
    {
      nombre : "Pizza",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/19C1-pizza.jpg",
    },
    {
      nombre : "Hamburguesa",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/IFOOD_CO_COUSINES_BURGERS.jpg",
    },
    {
      nombre : "Pollo",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/IFOOD_CO_COUSINES_POLLO.jpg",
    },
    {
      nombre : "Saludable",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/IFOOD_CO_COUSINES_SALUDABLE.jpg",
    },
    {
      nombre : "Parrilla",
      img_url : "https://static-images.ifood.com.br/image/upload/t_low/discoveries/IFOOD_CO_COUSINES_PARILLA.jpg",
    }
  ]
  alerta = false;

  imagen: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.imagen.push(...this.pictures)
  }

  activarAlerta(){
    this.alerta = true;
    setTimeout(()=>{
      this.alerta = false;
    },200)
  }

}
