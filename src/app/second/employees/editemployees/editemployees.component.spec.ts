import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemployeesComponent } from './editemployees.component';

describe('EditemployeesComponent', () => {
  let component: EditemployeesComponent;
  let fixture: ComponentFixture<EditemployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditemployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
