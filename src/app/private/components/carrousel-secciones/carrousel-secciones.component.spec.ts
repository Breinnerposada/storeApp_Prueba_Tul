import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselSeccionesComponent } from './carrousel-secciones.component';

describe('CarrouselSeccionesComponent', () => {
  let component: CarrouselSeccionesComponent;
  let fixture: ComponentFixture<CarrouselSeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrouselSeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrouselSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
