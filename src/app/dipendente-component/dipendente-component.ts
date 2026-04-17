import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDipendenteComponent } from '../addOn/add-dipendente-component/add-dipendente-component';
import { SearchDipendenteComponent } from '../addOn/search-dipendente-component/search-dipendente-component';

// Componente Dipendente
@Component({
  selector: 'app-dipendente',
  standalone: true,
  imports: [CommonModule, AddDipendenteComponent, SearchDipendenteComponent],
  templateUrl: './dipendente-component.html',
  styleUrl: './dipendente-component.css',
})
export class DipendenteComponent {

  view: 'menu' | 'add' | 'search' = 'menu';

  openAdd() {
    this.view = 'add';
  }

  openSearch() {
    this.view = 'search';
  }

  backToMenu() {
    this.view = 'menu';
  }
}