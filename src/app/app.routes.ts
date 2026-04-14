import { DipendenteComponent } from './dipendente/dipendente';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'home' , component: HomeComponent},
  {path : 'dipendente' , component: DipendenteComponent},
  {path : '**' , redirectTo:'home'}
];
