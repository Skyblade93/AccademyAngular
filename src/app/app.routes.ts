import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';
import { DroneComponent } from './drone/drone-component'; 
import { DipendenteComponent } from './dipendente/dipendente';
import { AziendaComponent } from './azienda/azienda';
import { AutoComponent } from './auto-component/auto-component';
import { Carrello } from './carrello/carrello';
import { NotificaComponent } from './notifica/notifica';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'drone', component: DroneComponent },
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent }, // Questa riga ora funzionerà
  { path: 'dipendente', component: DipendenteComponent },
  { path: 'azienda', component: AziendaComponent },
  { path: 'carrello', component: Carrello },
  { path: '**', redirectTo: 'home' } 
];