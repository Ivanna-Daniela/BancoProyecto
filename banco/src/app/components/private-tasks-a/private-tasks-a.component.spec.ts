import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTasksAComponent } from './private-tasks-a.component';

describe('PrivateTasksAComponent', () => {
  let component: PrivateTasksAComponent;
  let fixture: ComponentFixture<PrivateTasksAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTasksAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateTasksAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
