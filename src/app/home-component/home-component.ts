<<<<<<< HEAD:src/app/home-component/home-component.ts
 import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
=======
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
>>>>>>> 5ac41b4 (edit home + edit style contact):src/app/home/home.ts
})

export class HomeComponent {
  welcomeTitle = 'Academy Engineering Hub';
  welcomeMessage =
    'Il centro di controllo unificato per la gestione di logistica, utenza e infrastrutture intelligenti.';

  isDetailsOpen = signal(false); // Stato per la tendina

  constructor(private router: Router) {}

  toggleDetails(): void {
    this.isDetailsOpen.update((value) => !value);
  }

  goToContacts(): void {
    this.router.navigate(['/contact']);
  }
}
