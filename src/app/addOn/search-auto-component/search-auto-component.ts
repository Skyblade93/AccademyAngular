import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export type SearchAutoFilters = {
  id: number | null;
  targa: string;
  marca: string;
  modello: string;
  carburante: string;
  searchType: 'exact' | 'containing' | 'starting' | 'ending';
};

@Component({
  selector: 'app-search-auto-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-auto-component.html',
  styleUrl: './search-auto-component.css',
})
export class SearchAutoComponent {
  carburanteOptions = input<string[]>([]);

  searchFilters = output<SearchAutoFilters>();
  clearSearch = output<void>();

  filterForm = new FormGroup({
    id: new FormControl<number | null>(null),
    targa: new FormControl('', { nonNullable: true }),
    marca: new FormControl('', { nonNullable: true }),
    modello: new FormControl('', { nonNullable: true }),
    carburante: new FormControl('', { nonNullable: true }),
    searchType: new FormControl<'exact' | 'containing' | 'starting' | 'ending'>('exact', { nonNullable: true }),
  });

  applySearch() {
    const filters: SearchAutoFilters = {
      id: this.filterForm.controls.id.value,
      targa: this.filterForm.controls.targa.value,
      marca: this.filterForm.controls.marca.value,
      modello: this.filterForm.controls.modello.value,
      carburante: this.filterForm.controls.carburante.value,
      searchType: this.filterForm.controls.searchType.value,
    };

    this.searchFilters.emit(filters);
  }

  clearFilters() {
    this.filterForm.reset({
      id: null,
      targa: '',
      marca: '',
      modello: '',
      carburante: '',
      searchType: 'exact',
    });
    this.clearSearch.emit();
  }
}
