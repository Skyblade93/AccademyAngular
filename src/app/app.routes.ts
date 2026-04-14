import { AziendaComponent } from './azienda/azienda';
import { Carrello } from './carrello/carrello';
import { HomeComponent } from './home/home';
import { NotificaComponent } from './notifica/notifica';
import { UserComponent } from './user/user';
import { AutoComponent } from './auto-component/auto-component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'drone', component : DroneComponent},
  {path : 'home' , component: HomeComponent},
  {path : '**' , redirectTo:'home'}
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: Carrello },
  { path: '**', redirectTo: 'home' },
];
