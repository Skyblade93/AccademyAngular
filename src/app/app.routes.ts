import { AziendaComponent } from './azienda/azienda';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'drone', component : DroneComponent},
  {path : 'home' , component: HomeComponent},
  {path : '**' , redirectTo:'home'}
  { path: 'auto', component: AutoComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  {path : '**' , redirectTo:'home'}
];
