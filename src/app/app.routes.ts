import { Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora';
import { GananciasComponent } from './ganancias/ganancias';
import { HistorialComponent } from './historial/historial';


export const routes: Routes = [
  { path: '', redirectTo: 'interes', pathMatch: 'full' },
  { path: 'interes', component: CalculadoraComponent },
  { path: 'ganancias', component: GananciasComponent },
  { path: 'historial', component: HistorialComponent }
];


