import { Component, OnInit } from '@angular/core';
import { Model } from '../type/model.type';
import { Color } from '../type/color.type';
import { ModelService } from '../model.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.scss'
})
export class ModelSelectionComponent implements OnInit{
  models: Model[] =[];
  colors: Color[] =[];

  constructor(private modelService : ModelService) {}
  ngOnInit(): void {
    this.modelService.getModel().subscribe(
      data => {
                this.models = data;
                this.colors = this.filterColor(this.modelService.selectedModel?.code??'');
              }

    );
    this.modelForm.controls.modelSelect.setValue(this.modelService.selectedModel?.code??'');
    this.modelForm.controls.colorSelect.setValue(this.modelService.selectedColor?.code??'');
    
  }
  modelForm = new FormGroup({
    modelSelect : new FormControl(this.modelService.selectedModel?.code??''),
    colorSelect: new FormControl(this.modelService.selectedColor?.code??''),
  });

  private filterColor(value: string): Color[] {
    const selectedModel = this.models.find(c => c.code === value);
    return selectedModel ? selectedModel?.colors : [];
  }

  onModelChange(): void {
    this.modelForm.controls.colorSelect.reset();
    const model = this.modelForm.get('modelSelect')?.value??''
    this.colors = this.filterColor(model);
    this.modelService.selectedModel = this.models.find(c => c.code === model);
    this.modelForm.controls.colorSelect.setValue(this.colors[0].code);
    this.modelService.selectedColor = this.colors[0];
  }

  onColorChange(): void {
    this.modelService.selectedColor =  this.colors.find(c => c.code === this.modelForm.get('colorSelect')?.value??'');
  }

  get model() {
      return this.modelService.selectedModel;
    // return this.modelForm.get('modelSelect');
  }

  get color() {
    return this.modelService.selectedColor;
    // return this.modelForm.get('colorSelect');
  }

  get showColorDropdown(): boolean {
    return this.modelService.selectedModel != undefined;
  }
}
