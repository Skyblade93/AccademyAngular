import { HomeComponent } from './home/home';
import { UserCompont } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserCompont},
  {path : 'home' , component: HomeComponent},
  {path : '**' , redirectTo:'home'}
];
