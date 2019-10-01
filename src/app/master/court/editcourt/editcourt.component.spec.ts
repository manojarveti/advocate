import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcourtComponent } from './editcourt.component';

describe('EditcourtComponent', () => {
  let component: EditcourtComponent;
  let fixture: ComponentFixture<EditcourtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcourtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
