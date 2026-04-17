import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from '../Service/userService';
import { UserDto } from '../Dto/UserDto';
import { AddUserComponent } from '../addOn/add-user-component/add-user-component';

function hasNumericId(user: UserDto): user is UserDto & { id: number } {
  return typeof user.id === 'number';
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, AddUserComponent],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent implements OnInit {

  /* 🔥 Service */
  private service = inject(userService);

  /* 🔥 STATE (WRITABLE SIGNAL) */
  users = signal<UserDto[]>([]);

  /* 🔥 UI STATE */
  isPopupVisible = signal(false);
  selectedUser = signal<UserDto | null>(null);
  istoggleAddUser = signal(false);

  /* 🔥 COMPUTED */
  sortedUsers = computed(() =>
    [...this.users()].sort((a, b) => (a.id ?? Number.MAX_SAFE_INTEGER) - (b.id ?? Number.MAX_SAFE_INTEGER))
  );

  count = computed(() => {
    const ids = this.users()
      .filter(hasNumericId)
      .map(user => user.id);

    return ids.length
      ? Math.max(...ids)
      : 0;
  });

  /* ================= INIT ================= */

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getAll().subscribe({
      next: (data: UserDto[]) => {
        this.users.set(data);
      },
      error: (err: any) => console.error(err),
    });
  }

  /* ================= CRUD ================= */

  ottieniElemento(id: number): void {
    this.service.read(id).subscribe({
      next: (user: UserDto) => {
        this.selectedUser.set(user);
      },
      error: () => {
        this.isPopupVisible.set(true);
      },
    });
  }

  deleteUser(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.users.update(list => list.filter(u => u.id !== id));
      },
      error: (err: any) => console.error(err),
    });
  }

  /* ================= ADD USER (child output) ================= */

  onUserCreated(user: UserDto): void {
    this.users.update(list => [...list, user]);
    console.log('User aggiunto:', user);
  }

  /* ================= UI ================= */

  togglePopup(): void {
    this.isPopupVisible.update(v => !v);
  }

    toggleAddUser(): void {
    this.istoggleAddUser.update(v=> !v);
  }
}
