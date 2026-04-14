import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  listaArray : Array<number> = [];

  ListaPersona : UserDto[] = [];

 user : UserDto = new UserDto("mario", "rossi");
 user2 : UserDto = new UserDto("luigi", "verdi");

userForm = new FormGroup({
  nome: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
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
 if (this.userForm.valid) {
  const value = this.userForm.getRawValue();

  this.ListaPersona.push(
    new UserDto(value.nome, value.cognome || "")
  );
}
}

ordinaLista(){
  this.ListaPersona.sort((a,b) => a.cognome.localeCompare(b.cognome)).
  forEach((persona) =>{
    persona.nome = persona.nome.charAt(0).toUpperCase().concat(persona.nome.slice(1));
    persona.cognome = persona.cognome.charAt(0).toUpperCase().concat(persona.cognome.slice(1));});

}

deletePersona(index : number){
  this.ListaPersona.splice(index,1);
}


modificaPersona(index : number){
  const persona = this.ListaPersona[index];
  this.userForm.setValue({
    nome: persona.nome,
    cognome: persona.cognome
  });
  this.ListaPersona.splice(index,1);
}

}
