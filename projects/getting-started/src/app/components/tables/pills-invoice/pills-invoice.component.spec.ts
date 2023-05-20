import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillsInvoiceComponent } from './pills-invoice.component';

describe('PillsInvoiceComponent', () => {
  let component: PillsInvoiceComponent;
  let fixture: ComponentFixture<PillsInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PillsInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PillsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
