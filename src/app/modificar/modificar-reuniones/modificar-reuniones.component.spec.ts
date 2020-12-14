import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReunionesComponent } from './modificar-reuniones.component';

describe('ModificarReunionesComponent', () => {
  let component: ModificarReunionesComponent;
  let fixture: ComponentFixture<ModificarReunionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarReunionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
