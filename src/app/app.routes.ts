import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user';
import { AutoComponent } from './auto-component/auto-component';
import { CarrelloComponent } from './carrello/carrello-component';
import { ElettricistaComponent } from './elettricista/elettricista';
import { AziendaComponent } from './azienda-component/azienda-component';
import { DipendenteComponent } from './dipendente-component/dipendente-component';
import { DroneComponent } from './drone/drone';
import { NotificaComponent } from './notifica-component/notifica-component';
import { OrdineComponent } from './ordine-Component/ordine';
import { HomeComponent } from './home-component/home-component';


export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'home' , component: HomeComponent},
  {path : 'drone', component : DroneComponent},
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: CarrelloComponent },
  {path : 'home' , component: HomeComponent},
  {path : 'ordine' , component: OrdineComponent},
  {path : 'contact' , component: ContactComponent},
  { path: 'elettricista', component: ElettricistaComponent },
  { path: '**', redirectTo: 'home' },

];
