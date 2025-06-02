import { Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora';
import { GananciasComponent } from './ganancias/ganancias';

export const routes: Routes = [
  { path: '', redirectTo: 'interes', pathMatch: 'full' },
  { path: 'interes', component: CalculadoraComponent },
  { path: 'ganancias', component: GananciasComponent }
];


