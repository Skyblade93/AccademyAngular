import { UserDto } from './../../Dto/UserDto';
import { Component, input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { userService } from '../../Service/userService';



@Component({
  selector: 'app-add-user-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-component.html',
  styleUrl: './add-user-component.css',
})
export class AddUserComponent {

  constructor(private service: userService) {} // sostituisci con il tuo UserService

  userForm = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    descrizione: new FormControl(''),
  });

  // esempio: sostituisci con logica reale (backend o array)
   count = input<number>(0);

 @Output() countValue = new EventEmitter<UserDto>();

  sendCount(userDto: UserDto) {
    this.countValue.emit(userDto);
  }

  // countValue : Output<number> = new Output<number>( this.count().valueOf()+1);

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const nome = this.userForm.get('nome')!.value;
    const descrizione = this.userForm.get('descrizione')?.value ?? '';

    const newUser = new UserDto(
      nome,
      descrizione,
      null
    );


    this.service.insert(newUser).subscribe({
      next: () => this.userForm.reset(),
      error: (err: any) => console.error(err),
    });
    newUser.id = this.count().valueOf()+ 1
    newUser.name = newUser.name[0].toUpperCase()+ newUser.name.slice(1);
    newUser.description = newUser.description[0].toUpperCase() + newUser.description.slice(1);
    this.sendCount(newUser);

  }
}

