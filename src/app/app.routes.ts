import { DipendenteComponent } from './dipendente/dipendente';
import { AziendaComponent } from './azienda/azienda';
import { Carrello } from './carrello/carrello';
import { HomeComponent } from './home/home';
import { DroneComponent } from './drone/drone';
import { NotificaComponent } from './notifica/notifica';
import { UserComponent } from './user/user';
import { AutoComponent } from './auto-component/auto-component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Rotta di partenza: se l'URL è vuoto, vai alla home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // 2. Tutte le rotte dei componenti
  { path: 'home', component: HomeComponent },
  { path: 'drone', component: DroneComponent },
  { path: 'user', component: UserComponent },
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'dipendente', component: DipendenteComponent },
  { path: 'azienda', component: AziendaComponent },
  { path: 'carrello', component: Carrello },

  // 3. Wildcard: se l'utente scrive una cavolata nell'URL, torna in home
  // DEVE essere sempre l'ultima riga
  { path: '**', redirectTo: 'home' },
];