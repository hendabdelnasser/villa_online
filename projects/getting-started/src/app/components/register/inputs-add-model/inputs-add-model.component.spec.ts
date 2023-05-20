import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsAddModelComponent } from './inputs-add-model.component';

describe('InputsAddModelComponent', () => {
  let component: InputsAddModelComponent;
  let fixture: ComponentFixture<InputsAddModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputsAddModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsAddModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
