import { Routes } from '@angular/router';
import { HomeComponent } from './home/home'; // Aggiungi .ts se non lo trova
import { DroneComponent } from './drone/drone';
import { UserComponent } from './user/user';

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'drone', component: DroneComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Meglio usare questo per la home
  { path: '**', redirectTo: 'home' }
];