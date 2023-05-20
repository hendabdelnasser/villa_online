import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsInvoiceComponent } from './clients-invoice.component';

describe('ClientsInvoiceComponent', () => {
  let component: ClientsInvoiceComponent;
  let fixture: ComponentFixture<ClientsInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
