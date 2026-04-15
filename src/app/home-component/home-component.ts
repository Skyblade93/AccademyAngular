 import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {


  numero : number = 0;

  cambiaNumero(){
    this.numero = this.numero +1 ;

  }
}
