import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshboardPanelComponent } from './ashboard-panel.component';

describe('AshboardPanelComponent', () => {
  let component: AshboardPanelComponent;
  let fixture: ComponentFixture<AshboardPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AshboardPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AshboardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
