import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { userService } from '../Service/userService';
import { UserDto } from '../Dto/UserDto';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent {
  /* 🔥 Dependency Injection moderna */
  private service = inject(userService);

  /* 🔥 Stream → Signal */
  private users$ = this.service.getAll();
  users = toSignal(this.users$, { initialValue: [] as UserDto[] });

  /* 🔥 Stato UI */
  isPopupVisible = signal(false);
  selectedUser = signal<UserDto | null>(null);

  /* 🔥 Computed signals */
  sortedUsers = computed(() =>
    [...this.users()].sort((a, b) => a.id - b.id)
  );

  count = computed(() => {
    const list = this.users();
    return list.length
      ? Math.max(...list.map((u) => u.id))
      : 0;
  });

  /* 🔥 Form */
  userForm = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    descrizione: new FormControl(''),
  });

  /* ================= CRUD ================= */

  ottieniElemento(id: number) {
    this.service.read(id).subscribe({
      next: (user) => this.selectedUser.set(user),
      error: () => this.isPopupVisible.set(true),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const nome = this.userForm.get('nome')!.value;
      const descrizione = this.userForm.get('descrizione')?.value || '';

      const newUser = new UserDto(
        nome,
        descrizione,
        this.count() + 1
      );

      this.service.insert(newUser).subscribe({
        next: () => this.userForm.reset(),
      });
    }
  }

  deleteUser(id: number) {
    this.service.delete(id).subscribe();
  }

  togglePopup() {
    this.isPopupVisible.update((v) => !v);
  }
}
