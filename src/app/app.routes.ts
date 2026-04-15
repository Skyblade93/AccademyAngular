import { ContactComponent } from './contact/contact';
import { DipendenteComponent } from './dipendente/dipendente';
import { AziendaComponent } from './azienda/azienda';
import { Carrello } from './carrello/carrello';
import { HomeComponent } from './home/home';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e1d30ac (First Update Css)
import { DroneComponent } from './drone/drone';
=======
>>>>>>> 73d4986 (Modified: notifica)
import { NotificaComponent } from './notifica/notifica';
import { UserComponent } from './user/user';
import { AutoComponent } from './auto-component/auto-component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'drone', component : DroneComponent},
<<<<<<< HEAD
  {path : 'user', component : UserComponent},
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
=======
  { path: 'auto', component: AutoComponent },
  { path: 'notifica', component: NotificaComponent },
<<<<<<< HEAD
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
>>>>>>> 1361c50 (fix: update navigation and routing for Notifiche component)
=======
>>>>>>> e1d30ac (First Update Css)
  {path : 'dipendente' , component: DipendenteComponent},
  {path : 'azienda', component: AziendaComponent},
  { path: 'carrello', component: Carrello },
  {path : 'home' , component: HomeComponent},
  {path : 'contact' , component: ContactComponent},
  { path: '**', redirectTo: 'home' },
];
