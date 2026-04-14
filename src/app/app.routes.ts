import { HomeComponent } from './home/home';
import { DroneComponent } from './drone/drone';
import { UserComponent } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'drone', component : DroneComponent},
  {path : 'home' , component: HomeComponent},
  {path : '**' , redirectTo:'home'}
];
