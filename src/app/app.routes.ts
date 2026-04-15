import { DipendenteComponent } from './dipendente/dipendente';
import { AziendaComponent } from './azienda/azienda';
import { Carrello } from './carrello/carrello';
import { DroneComponent } from './drone/drone';
import { NotificaComponent } from './notifica/notifica';
import { AutoComponent } from './auto-component/auto-component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';

export const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'user', component : UserComponent},
  {path : 'drone', component : DroneComponent},
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: Carrello },
  { path: '**', redirectTo: 'home' },
];
