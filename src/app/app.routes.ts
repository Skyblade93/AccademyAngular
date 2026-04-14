import { DipendenteComponent } from './dipendente/dipendente';
import { AziendaComponent } from './azienda/azienda';
import { Carrello } from './carrello/carrello';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';
import { AutoComponent } from './auto-component/auto-component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auto', component: AutoComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: Carrello },
  { path: '**', redirectTo: 'home' },
];
