import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from './../Service/userService';
import { UserDto } from '../Dto/UserDto';
import { AddUserComponent } from '../addOn/add-user-component/add-user-component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, AddUserComponent],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent implements OnInit {

  private service = inject(userService);

  users = signal<UserDto[]>([]);
  isPopupVisible = signal(false);
  selectedUser = signal<UserDto | null>(null);
  istoggleAddUser = signal(false);

  sortedUsers = computed(() =>
    [...this.users()].sort((a, b) => a.id - b.id)
  );

  count = computed(() => {
    const list = this.users();
    return list.length ? Math.max(...list.map(u => u.id)) : 0;
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getAll().subscribe({
      next: (data: UserDto[]) => this.users.set(data),
      error: (err: any) => console.error(err),
    });
  }

  ottieniElemento(id: number): void {
    this.service.read(id).subscribe({
      next: (user: UserDto) => this.selectedUser.set(user),
      error: () => this.isPopupVisible.set(true),
    });
  }

  deleteUser(id: number): void {
    this.service.delete(id).subscribe({
      next: () => this.users.update(list => list.filter(u => u.id !== id)),
      error: (err: any) => console.error(err),
    });
  }

  onUserCreated(user: UserDto): void {
    this.users.update(list => [...list, user]);
  }

  togglePopup(): void {
    this.isPopupVisible.update(v => !v);
  }

  toggleAddUser(): void {
    this.istoggleAddUser.update(v => !v);
  }
}