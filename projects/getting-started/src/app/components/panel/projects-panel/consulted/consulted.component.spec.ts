import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultedComponent } from './consulted.component';

describe('ConsultedComponent', () => {
  let component: ConsultedComponent;
  let fixture: ComponentFixture<ConsultedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultedComponent]
    });
    fixture = TestBed.createComponent(ConsultedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
