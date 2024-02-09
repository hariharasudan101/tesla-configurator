import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Configs } from '../type/configs.type';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Config } from '../type/config.type';

@Component({
  selector: 'app-config-selection',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './config-selection.component.html',
  styleUrl: './config-selection.component.scss'
})
export class ConfigSelectionComponent implements OnInit{
  
  constructor(private modelService : ModelService) {}

  config: Config[] = []
  towHitch: boolean = false;
  yoke: boolean = false;

  configForm = new FormGroup({
    configSelect : new FormControl(0),
    towHitch: new FormControl(false),
    yoke: new FormControl(false),
  });
  
  ngOnInit(): void {
    this.modelService.getConfig().subscribe(
      data => {
        console.log(data);
        this.config = data.configs;
        this.towHitch = data.towHitch;
        this.yoke = data.yoke;
        this.configForm.controls.configSelect.setValue(this.modelService.selectedConfig?.id??this.config[0].id);
        this.modelService.selectedConfig = this.modelService.selectedConfig??this.config[0];
      }
    );
    this.configForm.controls.towHitch.setValue(this.modelService.towHitchOpted??false);
    this.configForm.controls.yoke.setValue(this.modelService.yokeOpted??false);
  }

  get selectedConfig() {
    return this.configForm.get('configSelect')?.value;
  }

  filterConfig(configId: number | string){
    return this.config.find(c => c.id === configId);
  }

  onConfigChange(): void {
    if(typeof this.configForm?.get('configSelect')?.value === 'number'){
       this.modelService.selectedConfig = this.filterConfig(this.configForm!.get('configSelect')!.value!);
    }
  }

  onTowHitchChange(): void {
   this.modelService.towHitchOpted = this.configForm.controls.towHitch.value??false;
  }

  onYokeChange(): void {
    this.modelService.yokeOpted = this.configForm.controls.yoke.value??false;
  }

  getRange(selectedConfigId: number | string): number {
    const selectedConfig = this.filterConfig(selectedConfigId);
    return selectedConfig ? selectedConfig.range : -1; 
  }

  getSpeed(selectedConfigId: number | string): number {
    const selectedConfig = this.config.find(c => c.id === selectedConfigId);
    return selectedConfig ? selectedConfig.speed : -1; 
  }

  getPrice(selectedConfigId: number | string): number {
    const selectedConfig = this.config.find(c => c.id === selectedConfigId);
    return selectedConfig ? selectedConfig.price : -1; 
  }

 
}
