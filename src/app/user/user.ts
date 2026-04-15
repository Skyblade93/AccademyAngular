import { userService } from './../Service/userService';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserDto } from '../Dto/UserDto';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent implements OnInit {
  /*/* Dichiarazione variabili */
  service: userService;

  ListUser: UserDto[] = [];

  count = signal(0);

 isPopupVisible = false;

  user: UserDto = new UserDto('', '', 0);

  UserSignal = signal<UserDto[]>([]);

  /*/* FormGroup per la gestione del form */
  userForm = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    descrizione: new FormControl(''),
  });


  /*/* Costruttore e metodi */
  ngOnInit() {}

  constructor(service: userService) {
    this.service = service;
    service.getAll().subscribe((users) => {
      this.ListUser = users;
    });
    this.UserSignal.set(this.ListUser);
    this.count.set(this.ListUser.sort((a, b) => b.id - a.id)[0]?.id || 0);
  }

/*/* Metodo per ottenere un elemento tramite ID */
ottieniElemento(id: number) {
  this.service.read(id).subscribe({
    next: (user) => {
      this.user = user;
    },
    error: (_err) => {
      this.isPopupVisible = !this.isPopupVisible; // Mostra il popup in caso di errore
    }
  });
}
/*/* Metodo per aggiungere un nuovo utente */
  onSubmit() {
    if (this.userForm.valid) {
      const nome: string = this.userForm.get('nome')?.value || '';
      const descrizione: string = this.userForm.get('descrizione')?.value || '';
      this.count.update((c) => c + 1);
      const newUser = new UserDto(nome, descrizione, this.count()); // ID will be set by the server
      this.UserSignal.update((users) => [...users, newUser]); // Optimistically update the UI
      this.ordinaListUser(); // Sort the list after adding a new user
      this.service.insert(newUser).subscribe(() => {
        // After successful insertion, refresh the user list
      });
    }
  }
/*/* Metodo per eliminare un utente */
  deleteUser(id: number) {
    this.service.delete(id).subscribe(() => {
      this.UserSignal.update((users) => users.filter((user) => user.id !== id));
    });
  }

  ordinaListUser(){
    this.UserSignal.update((users) => users.sort((a, b) => a.id - b.id));
  }

/*/* Metodo per gestire la chiusura del popup */
togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
  }

