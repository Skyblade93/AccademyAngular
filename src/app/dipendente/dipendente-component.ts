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

  aggiungi() {
    const dto = this.mapFormToDto();

    this.service.insert(dto).subscribe(() => {
      this.loadAll();
      this.reset();
    });
  }

  modifica(d: DipendenteDto) {
    this.dipendente = d;

    this.dipendenteForm.patchValue({
      nome: d.nomeDipendente,
      cognome: d.cognomeDipendente,
      eta: d.eta,
      email: d.email,
      telefono: d.numeroTelefono
    });
  }

  elimina(id: number) {
    this.service.delete(id).subscribe(() => {
      this.loadAll();
    });
  }

  mapFormToDto(): any {
    return {
      nomeDipendente: this.dipendenteForm.value.nome,
      cognomeDipendente: this.dipendenteForm.value.cognome,
      eta: this.dipendenteForm.value.eta,
      email: this.dipendenteForm.value.email,
      numeroTelefono: this.dipendenteForm.value.telefono
    };
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
      .subscribe(res => {
        if (res.length === 1) {
          this.setSingle(res[0]);  // 👉 popup
        } else {
          this.setList(res);       // 👉 lista
        }
      });

  } else if (telefono) {
    this.service.findByNumeroTelefono(telefono)
      .subscribe(res => {
        if (res.length === 1) {
          this.setSingle(res[0]);  // 👉 popup
        } else {
          this.setList(res);
        }
      });
  } else {
    this.loadAll();
  }
}

}
