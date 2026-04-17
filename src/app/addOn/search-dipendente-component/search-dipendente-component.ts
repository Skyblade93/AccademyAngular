import { Component, EventEmitter, Output, signal, OnInit } from '@angular/core';
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
export class SearchDipendenteComponent implements OnInit {

  constructor(private service: DipendenteService) {}

  @Output() close = new EventEmitter<void>();

  // =========================
  // SIGNAL STATE
  // =========================
  baseList = signal<DipendenteDto[]>([]);
  risultati = signal<DipendenteDto[]>([]);

  // =========================
  // FORM
  // =========================
  dipendenteForm = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    eta: new FormControl<number | null>(null),
    email: new FormControl(''),
    telefono: new FormControl<number | null>(null),
  });

  // =========================
  // UI STATE
  // =========================
  popup: DipendenteDto | null = null;
  confirmDelete: DipendenteDto | null = null;
  editPopup: DipendenteDto | null = null;
  successMessage: string | null = null;
  successTimeout: any;

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.loadAll();
  }

  // =========================
  // LOAD
  // =========================
  loadAll() {
    this.service.getAll().subscribe(res => {
      this.baseList.set(res);
      this.risultati.set(res);
    });
  }

  // =========================
  // FILTRO
  // =========================
  filtra() {
  const v = this.dipendenteForm.value;

  const nome = v.nome?.trim() || null;
  const cognome = v.cognome?.trim() || null;
  const email = v.email?.trim() || null;
  const eta = v.eta ?? null;
  const telefono = v.telefono ?? null;

  let request$: any;

    if (nome && cognome) {
  request$ = this.service.findByNomeDipendenteAndCognomeDipendente(nome, cognome);
} else if (nome) {
  request$ = this.service.findByNomeDipendente(nome);
} else if (cognome) {
  request$ = this.service.findByCognomeDipendente(cognome);
} else if (email) {
  request$ = this.service.findByEmail(email);
} else if (eta !== null) {
  request$ = this.service.findByEta(eta);
} else if (telefono !== null) {
  request$ = this.service.findByNumeroTelefono(telefono);
} else {
  this.risultati.set(this.baseList());
  return;
}

    request$.subscribe((res: DipendenteDto | DipendenteDto[]) => {
    const data = Array.isArray(res) ? res : [res];

    if (data.length === 1) {
      this.popup = data[0];
      this.risultati.set([]); // 👈 evita tabella incoerente
    } else {
      this.popup = null;
      this.risultati.set(data);
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
    this.risultati.set(this.baseList());
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

    if (id === null || id === undefined) return;

    this.service.delete(id).subscribe(() => {
      this.confirmDelete = null;
      this.showSuccess('Dipendente eliminato con successo');
      this.loadAll();
    });
  }

  // =========================
  // MODIFICA
  // =========================
  modifica(d: DipendenteDto) {
    this.editPopup = { ...d };
  }

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

  // =========================
  // SUCCESS
  // =========================
  showSuccess(msg: string) {
    this.successMessage = msg;

    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    this.successTimeout = setTimeout(() => {
      this.successMessage = null;
    }, 2000);
  }
}