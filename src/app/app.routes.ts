import { DipendenteComponent } from './dipendente/dipendente';
<<<<<<< HEAD
=======
import { AziendaComponent } from './azienda/azienda';
import { Carrello } from './carrello/carrello';
>>>>>>> develop
import { HomeComponent } from './home/home';


import { DroneComponent } from './drone/drone';
import { NotificaComponent } from './notifica/notifica';
import { UserComponent } from './user/user';
import { AutoComponent } from './auto-component/auto-component';
import { Routes } from '@angular/router';

export const routes: Routes = [
<<<<<<< HEAD
  {path : 'user', component : UserComponent},
  {path : 'home' , component: HomeComponent},
  {path : 'dipendente' , component: DipendenteComponent},
  {path : '**' , redirectTo:'home'}
=======
  {path : 'drone', component : DroneComponent},
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: Carrello },
  { path: '**', redirectTo: 'home' },
>>>>>>> develop
];
