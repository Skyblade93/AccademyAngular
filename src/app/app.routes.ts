import { Routes } from "@angular/router";

import { AutoComponent } from "./auto-component/auto-component";
import { AziendaComponent } from "./azienda-component/azienda-component";
import { ContactComponent } from "./contact/contact.component";
import { DipendenteComponent } from "./dipendente/dipendente-component";
import { DroneComponent } from "./drone/drone-component";
import { HomeComponent } from "./home-component/home-component";
import { NotificaComponent } from "./notifica-component/notifica-component";
import { UserComponent } from "./user/user";
import { CarrelloComponent } from "./carrello/carrello-component";
import { ElettricistaComponent } from "./elettricista-component/elettricista";
import { OrdineComponent } from "./ordine-Component/ordine";
import { ParcelComponent } from "./parcel/parcel";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'auto', component: AutoComponent },
  { path: 'azienda', component: AziendaComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dipendente', component: DipendenteComponent },
  { path: 'drone', component: DroneComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'carrello', component: CarrelloComponent },
  { path: 'elettricista', component: ElettricistaComponent },
  { path: 'ordine', component: OrdineComponent },
  { path: 'parcel', component: ParcelComponent },

  { path: '**', redirectTo: 'home' }
];