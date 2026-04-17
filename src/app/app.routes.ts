import { Routes } from "@angular/router";
import { AutoComponent } from "./auto-component/auto-component";
import { AziendaComponent } from "./azienda-component/azienda-component";
import { CarrelloComponent } from "./carrello/carrello-component";
import { ContactComponent } from "./contact/contact.component";
import { DroneComponent } from "./drone/drone-component";
import { ElettricistaComponent } from "./elettricista/elettricista";
import { HomeComponent } from "./home-component/home-component";
import { NotificaComponent } from "./notifica-component/notifica-component";
import { OrdineComponent } from "./ordine-Component/ordine";
import { ParcelComponent } from "./parcel-component/parcel-component";
import { UserComponent } from "./user/user";
import { DipendenteComponent } from "./dipendente-component/dipendente-component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'parcel', component: ParcelComponent },
  { path: 'elettricista', component: ElettricistaComponent },
  { path: 'ordine', component: OrdineComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'drone', component: DroneComponent },
  { path: 'user', component: UserComponent },
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'dipendente', component: DipendenteComponent },
  { path: 'azienda', component: AziendaComponent },
  { path: 'carrello', component: CarrelloComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
