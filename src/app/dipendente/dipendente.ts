import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DipendenteService } from '../Service/dipendenteService';
import { DipendenteDto } from '../Dto/DipendenteDto';

@Component({
  selector: 'app-dipendente',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './dipendente.html',
  styleUrl: './dipendente.css',
})
export class DipendenteComponent {

  service: DipendenteService;
  ListDipendente: DipendenteDto[] = [];

  dipendente: DipendenteDto = new DipendenteDto(0,'','',0,'',0);

  dipendenteForm = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    cognome: new FormControl('')
  });

  constructor(service: DipendenteService) { 
    this.service = service;
    service.getAll().subscribe(dipendente => {
      this.ListDipendente = dipendente;
    });

    service.getAllDipendenti().subscribe(res => {
      console.log(res);
    });
    
  }
  

  ottieniElemento(id: number) {
      this.service.read(id).subscribe(dipendente => {
      this.dipendente = dipendente;
    })
  }

  cercaNomeCognomeTelefono(nome: string, cognome: string, telefono: number) {
    this.service
      .findByNomeDipendenteAndCognomeDipendenteAndNumeroTelefono(nome, cognome, telefono)
      .subscribe(res => {
        this.dipendente = res;
      });
  }

  cercaNomeECognome(nome: string, cognome: string) {
    this.service
      .findByNomeDipendenteAndCognomeDipendente(nome, cognome)
      .subscribe(res => {
        this.dipendente = res;
      });
  }

  cercaPerEta(eta: number) {
  this.service.findByEta(eta).subscribe(res => {
    this.ListDipendente = res;
  });
}

cercaEtaMaggiore(eta: number) {
  this.service.findByEtaGreaterThan(eta).subscribe(res => {
    this.ListDipendente = res;
  });
}

cercaPerEmail(email: string) {
  this.service.findByEmail(email).subscribe(res => {
    this.dipendente = res;
  });
}

cercaEmailEta(email: string, eta: number) {
  this.service.findByEmailAndEta(email, eta).subscribe(res => {
    this.dipendente = res;
  });
}

cercaNomeEta(nome: string, eta: number) {
  this.service.findByNomeDipendenteAndEta(nome, eta).subscribe(res => {
    this.dipendente = res;
  });
}

cercaPerCognome(cognome: string) {
  this.service.findByCognomeDipendente(cognome).subscribe(res => {
    this.dipendente = res;
  });
}

cercaEmailTelefono(email: string, telefono: number) {
  this.service.findByEmailAndNumeroTelefono(email, telefono).subscribe(res => {
    this.dipendente = res;
  });
}

cercaPerNome(nome: string) {
  this.service.findByNomeDipendente(nome).subscribe(res => {
    this.dipendente = res;
  });
}

}
