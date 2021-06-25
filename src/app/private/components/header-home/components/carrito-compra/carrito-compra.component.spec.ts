import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoCompraComponent } from './carrito-compra.component';

describe('CarritoCompraComponent', () => {
  let component: CarritoCompraComponent;
  let fixture: ComponentFixture<CarritoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
