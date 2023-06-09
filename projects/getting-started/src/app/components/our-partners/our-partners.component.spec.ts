import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPartnersComponent } from './our-partners.component';

describe('OurPartnersComponent', () => {
  let component: OurPartnersComponent;
  let fixture: ComponentFixture<OurPartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurPartnersComponent]
    });
    fixture = TestBed.createComponent(OurPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
