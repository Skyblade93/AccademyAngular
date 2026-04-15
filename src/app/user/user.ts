import { userService } from './../Service/userService';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDto } from '../Dto/UserDto';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent implements OnInit {

  service: userService;
  ListUser: UserDto[] = [];

  count = signal(0);

  user: UserDto = new UserDto('','',0);

userForm = new FormGroup({
  nome: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
  descrizione: new FormControl('')
});


ngOnInit(){

}

  constructor(service: userService) {
    this.service = service;
    service.getAll().subscribe(users => {
      this.ListUser = users;
    });

  }



ottieniElemento(id: number) {
  this.service.read(id).subscribe(user => {
  this.user = user;

})
}

onSubmit(){
  if (this.userForm.valid) {
     const nome : string = this.userForm.get('nome')?.value || '';
     const descrizione : string = this.userForm.get('descrizione')?.value || '';
    const newUser = new UserDto(nome, descrizione, 0); // ID will be set by the server
    this.count.update(n => n + 1);
    this.service.insert(newUser).subscribe(() => {
      // After successful insertion, refresh the user list
      this.service.getAll().subscribe(users => {
        this.ListUser = users;
      });
    });

}

}

}
