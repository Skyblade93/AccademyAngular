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
import { ElettricistaComponent } from "./elettricista/elettricista";
import { OrdineComponent } from "./ordine-component/ordine";
import { ParcelComponent } from "./parcel-component/parcel-component";



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path : 'parcel', component : ParcelComponent},
  {path : 'elettricista', component : ElettricistaComponent},
  {path : 'ordine', component : OrdineComponent},
  {path : 'contact', component : ContactComponent},
  { path: 'home', component: HomeComponent },
  { path: 'drone', component: DroneComponent },
  {path : 'home', component : HomeComponent},
  {path : 'user', component : UserComponent},
  {path : 'drone', component : DroneComponent},
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
  { path: 'dipendente', component: DipendenteComponent },
  { path: 'azienda', component: AziendaComponent },
  { path: 'user', component: UserComponent },
  { path: 'carrello', component: CarrelloComponent },
  { path: '**', redirectTo: 'home' } // Sempre per ultima!
];
