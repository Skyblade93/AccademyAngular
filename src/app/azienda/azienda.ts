import { AziendaDto } from './../Dto/AziendaDto';
import { Component, OnInit } from '@angular/core';
import { aziendaService } from '../Service/aziendaService';
import { UserDto } from '../Dto/UserDto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-azienda',
    standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './azienda.html',
  styleUrl: './azienda.css',
})
export class AziendaComponent implements OnInit {

  service: aziendaService;
  ListAzienda: AziendaDto[] = []

  azienda: AziendaDto =  new AziendaDto('', '', 0);

  aziendaForm = new FormGroup({
    nomeAzienda: new FormControl('')
  })

  ngOnInit(){
  }

  constructor(service: aziendaService) {
      this.service = service;
      service.getAll().subscribe(azienda => {
        this.ListAzienda = azienda;
      });

  }

  ottieniAzienda(id: number){
    this.service.read(id).subscribe(azienda =>{
      this.azienda = azienda;
    })
  }

  cercaPerNome(){
    const nome = this.aziendaForm.get('nomeAzienda')?.value;

    if(!nome)return;

    this.service.findByNomeAzienda(nome).subscribe(azienda =>{
      this.azienda=azienda;
    });
  }

  cercaPerNomeContaining(){
    const nome = this.aziendaForm.get('nomeAzienda')?.value;

    if(!nome) return;

    this.service.findByNomeAziendaContainingIgnoreCase(nome).subscribe(
      azienda => {this.ListAzienda = azienda;
      });
  }

  cercaPerDescrizione() {
    const desc = this.aziendaForm.get('descrizione')?.value;

    if (!desc) return;

    this.service.cercaPerDescrizione(desc).subscribe(res => {
      this.ListAzienda = res;
    });
  }

  cercaPerDescrizioneIgnoreCase() {
    const desc = this.aziendaForm.get('descrizione')?.value;

    if (!desc) return;

    this.service.findByDescrizioneAziendaContainingIgnoreCase(desc).subscribe(res => {
      this.ListAzienda = res;
    });
  }

  cercaPerTitolare(id: number) {
    this.service.findByTitolareId(id).subscribe(res => {
      this.azienda = res;
    });
  }

}
