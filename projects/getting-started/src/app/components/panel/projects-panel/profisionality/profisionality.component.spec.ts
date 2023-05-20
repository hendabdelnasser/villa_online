import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfisionalityComponent } from './profisionality.component';

describe('ProfisionalityComponent', () => {
  let component: ProfisionalityComponent;
  let fixture: ComponentFixture<ProfisionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfisionalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfisionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
