import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecuentaComponent } from './createcuenta.component';

describe('CreatecuentaComponent', () => {
  let component: CreatecuentaComponent;
  let fixture: ComponentFixture<CreatecuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
