import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
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
