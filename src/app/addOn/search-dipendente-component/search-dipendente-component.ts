import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DipendenteService } from '../../Service/dipendenteService';
import { DipendenteDto } from '../../Dto/DipendenteDto';

@Component({
  selector: 'app-search-dipendente-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-dipendente-component.html',
  styleUrl: './search-dipendente-component.css',
})
export class SearchDipendenteComponent {

  constructor(private service: DipendenteService) {
    this.loadAll();
  }

  @Output() close = new EventEmitter<void>();

  dipendenteForm = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    eta: new FormControl<number | null>(null),
    email: new FormControl(''),
    telefono: new FormControl<number | null>(null),
  });

  baseList: DipendenteDto[] = [];
  risultati: DipendenteDto[] = [];

  popup: DipendenteDto | null = null;

  // =========================
  // LOAD
  // =========================
  loadAll() {
    this.service.getAll().subscribe(res => {
      this.baseList = res;
      this.risultati = res;
    });
  }

  // =========================
  // FILTRO → POPUP
  // =========================
  filtra() {
    const v = this.dipendenteForm.value;

    let request$: any;

    if (v.nome && v.cognome) {
      request$ = this.service.findByNomeDipendenteAndCognomeDipendente(v.nome, v.cognome);

    } else if (v.nome) {
      request$ = this.service.findByNomeDipendente(v.nome);

    } else if (v.cognome) {
      request$ = this.service.findByCognomeDipendente(v.cognome);

    } else if (v.email) {
      request$ = this.service.findByEmail(v.email);

    } else if (v.eta != null) {
      request$ = this.service.findByEta(v.eta);

    } else if (v.telefono != null) {
      request$ = this.service.findByNumeroTelefono(v.telefono);

    } else {
      return;
    }

    request$.subscribe((res: DipendenteDto | DipendenteDto[]) => {
      const data = Array.isArray(res) ? res : [res];

      // 👉 POPUP se 1 risultato
      if (data.length === 1) {
        this.popup = data[0];
      } else {
        // 👉 più risultati → mostro lista
        this.risultati = data;
      }
    });
  }

  // =========================
  // RESET COMPLETO
  // =========================
  reset() {
    this.dipendenteForm.reset();   // ✔ ora funziona davvero
    this.popup = null;
    this.risultati = this.baseList;
  }

  closePopup() {
    this.popup = null;
  }

  // =========================
  // DELETE
  // =========================
  elimina(id: number) {
    this.service.delete(id).subscribe(() => {
      this.loadAll();
    });
  }

  // =========================
  // MODIFICA
  // =========================
  modifica(d: DipendenteDto) {
    this.dipendenteForm.patchValue({
      nome: d.nomeDipendente,
      cognome: d.cognomeDipendente,
      eta: d.eta,
      email: d.email,
      telefono: d.numeroTelefono
    });
  }
}