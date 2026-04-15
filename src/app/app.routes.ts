import { HomeComponent } from './home/home';
import { OrdineComponent } from './ordine-Component/ordine';
import { UserComponent } from './user/user';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user', component : UserComponent},
  {path : 'home' , component: HomeComponent},
  {path : 'ordine' , component: OrdineComponent},
  {path : '**' , redirectTo:'home'}

];
