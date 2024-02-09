import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ModelService } from './model.service';
import { inject } from '@angular/core';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { ConfigSelectionComponent } from './config-selection/config-selection.component';



export const routes: Routes = [
    {
        path: 'model', component: ModelSelectionComponent
    },
    {
        path: 'config', component: ConfigSelectionComponent, canActivate: [() => inject(ModelService).isModelSelected]
    },
    {
        path: 'summary', component: SummaryComponent, canActivate: [() => inject(ModelService).isModelSelected]
    },
    {
        path: '', component: ModelSelectionComponent
    },
    {
        path: '**', component: ModelSelectionComponent
    },

];
