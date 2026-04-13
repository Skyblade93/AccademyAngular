import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDto } from '../home/Dto/UserDto';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent {

 nome : string = "mario";

   @Input() numero : number = 0;

  bool : boolean = true ;

  lista: number[] = [];

  ListaPersona : UserDto[] = [];

 user : UserDto = new UserDto("mario", "rossi");
 user2 : UserDto = new UserDto("luigi", "verdi");

userForm = new FormGroup({
  nome: new FormControl(''),
  cognome: new FormControl('')
});



  constructor( ) {

  }



  aggiungi1(){
   this.numero = this.numero+1;
   this.lista.push(this.numero)
  }

  rimuovi1(){
   this.lista.pop()
  }

elimina(){
  this.user2 = new UserDto("","");
}


onSubmit() {
  const value = this.userForm.value;

  this.ListaPersona.push(
    new UserDto(value.nome!, value.cognome!)
  );
}

}
