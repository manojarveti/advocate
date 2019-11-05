import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyleavesComponent } from './myleaves.component';

describe('MyleavesComponent', () => {
  let component: MyleavesComponent;
  let fixture: ComponentFixture<MyleavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyleavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
