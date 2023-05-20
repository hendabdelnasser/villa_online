import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillsDetailComponent } from './pills-detail.component';

describe('PillsDetailComponent', () => {
  let component: PillsDetailComponent;
  let fixture: ComponentFixture<PillsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PillsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PillsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
