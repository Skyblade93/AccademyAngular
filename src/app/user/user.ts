import { userService } from './../Service/userService';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  user: UserDto = new UserDto('','',0);

userForm = new FormGroup({
  nome: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
  cognome: new FormControl('')
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


}

