import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BePartnerComponent } from './be-partner.component';

describe('BePartnerComponent', () => {
  let component: BePartnerComponent;
  let fixture: ComponentFixture<BePartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BePartnerComponent]
    });
    fixture = TestBed.createComponent(BePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
