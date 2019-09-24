import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdepartmentsComponent } from './viewdepartments.component';

describe('ViewdepartmentsComponent', () => {
  let component: ViewdepartmentsComponent;
  let fixture: ComponentFixture<ViewdepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
