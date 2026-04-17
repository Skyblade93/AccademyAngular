import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDipendenteComponent } from '../addOn/add-dipendente-component/add-dipendente-component';
import { SearchDipendenteComponent } from '../addOn/search-dipendente-component/search-dipendente-component';
import { DipendenteDto } from '../Dto/DipendenteDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dipendente',
  standalone: true,
  imports: [CommonModule, AddDipendenteComponent, SearchDipendenteComponent],
  templateUrl: './dipendente-component.html',
  styleUrl: './dipendente-component.css',
})
export class DipendenteComponent {

  constructor(private router: Router) {}

  // =========================
  // STATE
  // =========================
  dipendenti = signal<DipendenteDto[]>([]);

  view: 'menu' | 'add' | 'search' = 'menu';

  sortedDipendenti = computed(() =>
    [...this.dipendenti()].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
  );

  // =========================
  // NAVIGATION
  // =========================
  openAdd() {
    this.view = 'add';
  }

  openSearch() {
    this.view = 'search';
  }

  backToMenu() {
    this.view = 'menu';
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}