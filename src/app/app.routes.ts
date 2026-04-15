import { ContactComponent } from './contact/contact';
import { DipendenteComponent } from './dipendente/dipendente-component';
import { AziendaComponent } from './azienda/azienda';
import { HomeComponent } from './home-component/home-component';
import { DroneComponent } from './drone/drone';
import { NotificaComponent } from './notifica-component/notifica-component';
import { OrdineComponent } from './ordine-Component/ordine';
import { UserComponent } from './user/user';
import { AutoComponent } from './auto-component/auto-component';
import { CarrelloComponent } from './carrello/carrello-component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'drone', component : DroneComponent},
  {path : 'user', component : UserComponent},
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: CarrelloComponent },
  {path : 'home' , component: HomeComponent},
  {path : 'ordine' , component: OrdineComponent},
  {path : 'contact' , component: ContactComponent},
  { path: '**', redirectTo: 'home' },

];
