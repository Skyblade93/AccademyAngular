import { ContactComponent } from './contact/contact';
import { DipendenteComponent } from './dipendente/dipendente';
import { AziendaComponent } from './azienda/azienda';
import { Carrello } from './carrello/carrello';
import { HomeComponent } from './home/home';
import { Routes } from '@angular/router';
import { AutoComponent } from './auto-component/auto-component';
import { DroneComponent } from './drone/drone';
import { NotificaComponent } from './notifica/notifica';
import { UserComponent } from './user/user';


export const routes: Routes = [
  {path : 'drone', component : DroneComponent},
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: Carrello },
  {path : 'home' , component: HomeComponent},
  {path : 'contact' , component: ContactComponent},
  { path: '**', redirectTo: 'home' },
];
