import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorsInvoiceComponent } from './constructors-invoice.component';

describe('ConstructorsInvoiceComponent', () => {
  let component: ConstructorsInvoiceComponent;
  let fixture: ComponentFixture<ConstructorsInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorsInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
