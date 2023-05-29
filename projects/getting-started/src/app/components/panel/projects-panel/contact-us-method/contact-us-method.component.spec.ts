import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsMethodComponent } from './contact-us-method.component';

describe('ContactUsMethodComponent', () => {
  let component: ContactUsMethodComponent;
  let fixture: ComponentFixture<ContactUsMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsMethodComponent]
    });
    fixture = TestBed.createComponent(ContactUsMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
