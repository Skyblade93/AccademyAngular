import { AziendaDto } from '../Dto/AziendaDto';
import { Component, OnInit } from '@angular/core';
import { aziendaService } from '../Service/aziendaService';
import { UserDto } from '../Dto/UserDto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoDto } from '../Dto/AutoDto';

@Component({
  selector: 'app-azienda',
    standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './azienda-component.html',
  styleUrl: './azienda-component.css',
})
export class AziendaComponent implements OnInit {

  showErrorPopup: boolean = false;
  showEditPopup: boolean = false;

  service: aziendaService;
  ListAzienda: AziendaDto[] = []

  azienda: AziendaDto =  new AziendaDto('', '', 0, new UserDto('','',0), new AutoDto('','','','',null, null));

  aziendaForm = new FormGroup({
    id: new FormControl(''),
    nomeAzienda: new FormControl(''),
    descrizione: new FormControl(''),
    titolareId: new FormControl('')
  })

  ngOnInit(){

  }

  prendilistAzienda() {
        this.service.getAll().subscribe(azienda => {
        this.ListAzienda = azienda;
      });
    }


  constructor(service: aziendaService) {
    this.service = service;
    this.loadPage();

  }

  salvaModifica() {

  this.service.update(this.azienda).subscribe({

    next: res => {

      this.closeEditPopup();

      this.service.getAll().subscribe(lista => {
        this.ListAzienda = lista;
      });

    }

  });

}

  ottieniAzienda(id: number) {

  this.service.read(id).subscribe({

    next: azienda => {
      this.azienda = azienda;
    },

    error: err => {
      this.showErrorPopup = true;
    }

  });
}

cerca(){

  const id = this.aziendaForm.get('id')?.value;
  const nomeAzienda = this.aziendaForm.get('nomeAzienda')?.value?.trim();
  const descrizione = this.aziendaForm.get('descrizione')?.value?.trim();
  const titolareId = this.aziendaForm.get('titolareId')?.value;

  // 1️⃣ PRIORITÀ ID (ricerca singola)

  if (id) {

    this.service.read(Number(id)).subscribe({

      next: azienda => {

        let risultato: AziendaDto[] = [azienda];

        // filtro aggiuntivo se presenti altri parametri

        if (nomeAzienda) {
          risultato = risultato.filter(a =>
            a.nomeAzienda
              .toLowerCase()
              .includes(nomeAzienda.toLowerCase())
          );
        }

        if (descrizione) {
          risultato = risultato.filter(a =>
            a.descrizioneAzienda
              .toLowerCase()
              .includes(descrizione.toLowerCase())
          );
        }

        if (titolareId) {
          risultato = risultato.filter(a =>
            a.titolare.id === Number(titolareId)
          );
        }

        if (risultato.length === 0) {

          this.ListAzienda = [];
          this.showErrorPopup = true;
          return;

        }

        this.ListAzienda = risultato;

      },

      error: err => {

        this.ListAzienda = [];
        this.showErrorPopup = true;

      }

    });

    return;

  }

  // 2️⃣ RICERCA COMBINATA SENZA ID

  this.service.getAll().subscribe(lista => {

    let risultato = lista;

    if (nomeAzienda) {

      risultato = risultato.filter(a =>
        a.nomeAzienda
          .toLowerCase()
          .includes(nomeAzienda.toLowerCase())
      );

    }

    if (descrizione) {

      risultato = risultato.filter(a =>
        a.descrizioneAzienda
          .toLowerCase()
          .includes(descrizione.toLowerCase())
      );

    }

    if (titolareId) {

      risultato = risultato.filter(a =>
        a.titolare.id === Number(titolareId)
      );

    }

    if (risultato.length === 0) {

      this.ListAzienda = [];
      this.showErrorPopup = true;
      return;

    }

    this.ListAzienda = risultato;

  });

}

resetRicerca() {

  this.aziendaForm.reset();

  this.service.getAll().subscribe(lista => {
    this.ListAzienda = lista;
  });

}

closeErrorPopup() {
  this.showErrorPopup = false;
}

openEditPopup() {
  this.showEditPopup = true;
}

closeEditPopup() {
  this.showEditPopup = false;
}

ordinaPerId() {
  this.ListAzienda = [...this.ListAzienda].sort((a, b) => a.id - b.id);
}

ordinaPerIniziale() {
  this.ListAzienda = [...this.ListAzienda].sort((a, b) =>
    a.nomeAzienda.charAt(0).toLowerCase()
      .localeCompare(b.nomeAzienda.charAt(0).toLowerCase())
  );
}

page = 0;
size = 5;

loadPage() {
  this.service.getPage(this.page, this.size).subscribe(res => {
    this.ListAzienda = res.content;
  });
}

next() {
  this.page++;
  this.loadPage();
}

prev() {
  if (this.page > 0) {
    this.page--;
    this.loadPage();
  }
}

  cercaPerTitolare(id: number) {
    this.service.findByTitolareId(id).subscribe(res => {
      this.azienda = res;
    });
  }


}
