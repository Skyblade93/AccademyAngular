import { ContactComponent } from './contact/contact';
import { HomeComponent } from './home/home';
import { UserComponent } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'home' , component: HomeComponent},
  {path : 'contact' , component: ContactComponent},
  {path : '**' , redirectTo:'home'}
];
