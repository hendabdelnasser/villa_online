import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultedsComponent } from './consulteds.component';

describe('ConsultedsComponent', () => {
  let component: ConsultedsComponent;
  let fixture: ComponentFixture<ConsultedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultedsComponent]
    });
    fixture = TestBed.createComponent(ConsultedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
