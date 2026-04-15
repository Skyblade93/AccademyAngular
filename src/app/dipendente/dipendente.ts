import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DipendenteService } from '../Service/dipendenteService';
import { DipendenteDto } from '../Dto/DipendenteDto';

@Component({
  selector: 'app-dipendente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dipendente.html',
  styleUrl: './dipendente.css',
})
export class DipendenteComponent {

  ListDipendente: DipendenteDto[] = [];
  dipendente: DipendenteDto | null = null;

  constructor(private service: DipendenteService) {
    this.loadAll();
  }

  dipendenteForm = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    eta: new FormControl<number | null>(null),
    email: new FormControl(''),
    telefono: new FormControl<number | null>(null),
  });

  loadAll() {
    this.service.getAll().subscribe(res => {
      this.ListDipendente = res;
    });
  }

  reset() {
    this.dipendenteForm.reset();
    this.dipendente = null;
    this.loadAll();
  }

  chiudiPopup() {
    this.dipendente = null;
  }

  setSingle(res: DipendenteDto) {
    this.dipendente = res;

    // 🔥 ricarica SEMPRE tutta la lista
    this.loadAll();
  }

  setList(res: DipendenteDto[]) {
    this.ListDipendente = res;
    this.dipendente = null;
  }

  // =========================
  // SEARCH (STILE AUTO)
  // =========================

  searchNome() {
    const nome = this.dipendenteForm.value.nome ?? '';
    this.service.findByNomeDipendente(nome)
      .subscribe(res => {
        this.dipendente = res;
        this.ListDipendente = [];
      });
  }

  searchNomeCognome() {
    const { nome, cognome } = this.dipendenteForm.value;
    this.service.findByNomeDipendenteAndCognomeDipendente(nome ?? '', cognome ?? '')
      .subscribe(res => {
        this.dipendente = res;
        this.ListDipendente = [];
      });
  }

  searchEta() {
    const eta = this.dipendenteForm.value.eta;
    if (!eta) return;

    this.service.findByEta(eta)
      .subscribe(res => {
        this.ListDipendente = res;
        this.dipendente = null;
      });
  }

  searchEtaMaggiore() {
    const eta = this.dipendenteForm.value.eta;
    if (!eta) return;

    this.service.findByEtaGreaterThan(eta)
      .subscribe(res => {
        this.ListDipendente = res;
        this.dipendente = null;
      });
  }

  searchEmail() {
    const email = this.dipendenteForm.value.email ?? '';
    this.service.findByEmail(email)
      .subscribe(res => {
        this.dipendente = res;
        this.ListDipendente = [];
      });
  }

  searchCognome() {
    const cognome = this.dipendenteForm.value.cognome ?? '';
    this.service.findByCognomeDipendente(cognome)
      .subscribe(res => {
        this.dipendente = res;
        this.ListDipendente = [];
      });
  }
}
