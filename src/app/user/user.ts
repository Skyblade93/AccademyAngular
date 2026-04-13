import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserCompont implements OnInit {

  nome : string = "mario";

  numero : number = 0;

  bool : boolean = true ;

  lista: number[] = [];

  personList : Person[] = [];

  persona : Person = new Person("Mario","Rossi")

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

export class Person {

  nome!: string;

  cognome !: string;

  constructor(nome : string, cognome: string){
    this.nome = nome;
    this.cognome = cognome;
  }
}
