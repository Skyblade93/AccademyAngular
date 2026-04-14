import { HomeComponent } from './home/home';
import { NotificaComponent } from './notifica/notifica';
import { UserComponent } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'home' , component: HomeComponent},
  {path : '**' , redirectTo:'home'}
];
