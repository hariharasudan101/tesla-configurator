import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSelectionComponent } from './model-selection.component';

describe('ModelSelectionComponent', () => {
  let component: ModelSelectionComponent;
  let fixture: ComponentFixture<ModelSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
