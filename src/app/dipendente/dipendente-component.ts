import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DipendenteService } from '../Service/dipendenteService';
import { DipendenteDto } from '../Dto/DipendenteDto';

@Component({
  selector: 'app-dipendente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dipendente-component.html',
  styleUrl: './dipendente-component.css',
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
  }

  setList(res: DipendenteDto[]) {
    this.ListDipendente = res;
    this.dipendente = null;
  }

  // =========================
  // SEARCH
  // =========================

  filtra() {

  const nome = this.dipendenteForm.value.nome?.trim() || '';
  const cognome = this.dipendenteForm.value.cognome?.trim() || '';
  const eta = this.dipendenteForm.value.eta;
  const email = this.dipendenteForm.value.email?.trim() || '';
  const telefono = this.dipendenteForm.value.telefono;

  if (email && telefono) {
    this.service.findByEmailAndNumeroTelefono(email, telefono!)
      .subscribe(res => this.setSingle(res));

  } else if (email && eta) {
    this.service.findByEmailAndEta(email, eta)
      .subscribe(res => this.setSingle(res));

  } else if (nome && cognome) {
    this.service.findByNomeDipendenteAndCognomeDipendente(nome, cognome)
      .subscribe(res => this.setSingle(res));

  } else if (nome && eta) {
    this.service.findByNomeDipendenteAndEta(nome, eta)
      .subscribe(res => this.setSingle(res));

  } else if (nome) {
    this.service.findByNomeDipendente(nome)
      .subscribe(res => this.setSingle(res));

  } else if (cognome) {
    this.service.findByCognomeDipendente(cognome)
      .subscribe(res => this.setSingle(res));

  } else if (email) {
    this.service.findByEmail(email)
      .subscribe(res => this.setSingle(res));

  } else if (eta) {
    this.service.findByEta(eta)
      .subscribe(res => this.setList(res));

  } else {
    this.loadAll();
  }
}

}
