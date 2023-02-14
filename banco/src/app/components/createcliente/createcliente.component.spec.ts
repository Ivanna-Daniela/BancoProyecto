import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateclienteComponent } from './createcliente.component';

describe('CreateclienteComponent', () => {
  let component: CreateclienteComponent;
  let fixture: ComponentFixture<CreateclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
