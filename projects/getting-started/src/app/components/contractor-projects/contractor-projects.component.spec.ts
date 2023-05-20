import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorProjectsComponent } from './contractor-projects.component';

describe('ContractorProjectsComponent', () => {
  let component: ContractorProjectsComponent;
  let fixture: ComponentFixture<ContractorProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
