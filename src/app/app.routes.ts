import { AziendaComponent } from './azienda/azienda';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'home' , component: HomeComponent},
  {path : 'azienda', component: AziendaComponent},
  {path : '**' , redirectTo:'home'}
];
