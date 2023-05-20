import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesDetailComponent } from './phases-detail.component';

describe('PhasesDetailComponent', () => {
  let component: PhasesDetailComponent;
  let fixture: ComponentFixture<PhasesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
