import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { DipendenteService } from '../../Service/dipendenteService';
import { DipendenteDto } from '../../Dto/DipendenteDto';

@Component({
  selector: 'app-search-dipendente-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search-dipendente-component.html',
  styleUrl: './search-dipendente-component.css',
})
export class SearchDipendenteComponent {

  constructor(private service: DipendenteService) {
    this.loadAll();
  }

  @Output() close = new EventEmitter<void>();

  // =========================
  // FORM FILTRI
  // =========================
  dipendenteForm = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    eta: new FormControl<number | null>(null),
    email: new FormControl(''),
    telefono: new FormControl<number | null>(null),
  });

  // =========================
  // DATI
  // =========================
  baseList: DipendenteDto[] = [];
  risultati: DipendenteDto[] = [];

  // =========================
  // POPUP VARI
  // =========================
  popup: DipendenteDto | null = null;               // dettaglio filtro
  confirmDelete: DipendenteDto | null = null;       // delete popup
  editPopup: DipendenteDto | null = null;           // modifica popup
  successMessage: string | null = null;             // messaggio successo

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
  // FILTRO
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

      if (data.length === 1) {
        this.popup = data[0];
      } else {
        this.risultati = data;
      }
    });
  }

  // =========================
  // RESET
  // =========================
  reset() {
    this.dipendenteForm.reset();
    this.popup = null;
    this.editPopup = null;
    this.confirmDelete = null;
    this.risultati = this.baseList;
  }

  closePopup() {
    this.popup = null;
  }

  closeSuccess() {
    this.successMessage = null;
  }

  // =========================
  // DELETE
  // =========================
  elimina(d: DipendenteDto) {
    this.confirmDelete = d;
  }

  confirmNo() {
    this.confirmDelete = null;
  }

  confirmYes() {
      if (!this.confirmDelete) return;

      const id = this.confirmDelete.id;

      this.service.delete(id).subscribe(() => {
      this.confirmDelete = null;

      this.showSuccess('Dipendente eliminato con successo');

      this.loadAll();
    });
  }

  // =========================
  // MODIFICA (OPEN POPUP)
  // =========================

  modifica(d: DipendenteDto) {
    this.editPopup = { ...d }; // clone sicuro
  }

  // =========================
  // SALVATAGGIO MODIFICA
  // =========================
  saveEdit() {
    if (!this.editPopup) return;
      this.service.update(this.editPopup).subscribe(() => {
      this.editPopup = null;

      this.showSuccess('Dipendente modificato con successo');

      this.loadAll();
    });
  }

  closeEdit() {
    this.editPopup = null;
  }

  successTimeout: any;

  showSuccess(msg: string) {
    this.successMessage = msg;

    // 🔥 evita sovrapposizione timeout
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    this.successTimeout = setTimeout(() => {
      this.successMessage = null;
    }, 2000);
  }

}
