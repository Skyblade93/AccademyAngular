import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';
import { ElettricistaComponent } from './elettricista/elettricista';

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'elettricista', component: ElettricistaComponent },
   { path: '', redirectTo: 'home', pathMatch: 'full' }
];