import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone : true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserCompont implements OnInit {

  nome : string = "mario";

  numero : number = 0;

  lista: number[] = [];

  constructor() {
  }


   ngOnInit() {

  }


  aggiungi1(){
   this.numero = this.numero+1;
   this.lista.push(this.numero)
  }


  rimuovi1(){
   this.lista.pop()
  }

}
