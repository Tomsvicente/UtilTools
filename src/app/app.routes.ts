import { Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculadora',
    pathMatch: 'full'
  },
  {
    path: 'calculadora',
    loadComponent: () => import('./calculadora/calculadora').then(m => m.CalculadoraComponent)
  }
];
