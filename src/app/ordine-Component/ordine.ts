import { Component, OnInit } from '@angular/core';
import { OrdineDto } from '../Dto/OrdineDto';
import { ordineService } from '../Service/ordineService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordine',
  imports: [CommonModule],
  templateUrl: './ordine.html',
  styleUrl: './ordine.css',
  standalone: true,
})
export class OrdineComponent implements OnInit{

  service: ordineService;
  ListOrdini: OrdineDto[] = [];
  ordine: OrdineDto | null = null;;

  ngOnInit(){

}

  constructor(service: ordineService) {
    this.service = service;
  }

  findById(id: number) {
  this.service.findById(id).subscribe(ordine => {
  this.ordine = ordine;
  })
  }

  trovaConCostoUguale(costo: number) {
  this.service.trovaConCostoUguale(costo).subscribe(ordini => {
  this.ordine = null;
  this.ListOrdini = ordini;
  })
  }

  trovaConNumeroProdottiMaggiore(num_prodotti: number) {
  this.service.trovaConNumeroProdottiMaggiore(num_prodotti).subscribe(ordini => {
  this.ListOrdini = ordini;
  this.ordine = null;
  });
}

trovaConIndirizzo(indirizzo: string) {
  this.service.trovaConIndirizzo(indirizzo).subscribe(ordini => {
  this.ListOrdini = ordini;
  this.ordine = null;
  });
}

trovaConCostoMaggiore(costo: number) {
  this.service.trovaConCostoMaggiore(costo).subscribe(ordini => {
  this.ordine = null;
  this.ListOrdini = ordini;
  });
}

trovaConCostoMinore(costo: number) {
  this.service.trovaConCostoMinore(costo).subscribe(ordini => {
  this.ordine = null;
  this.ListOrdini = ordini;
  });
}

trovaPerUtente(utente: number) {
  this.service.trovaPerUtente(utente).subscribe(ordini => {
  this.ListOrdini = ordini;
  this.ordine = null;
  });
}

filtro(numero: number, costo: number) {
  this.service.filtro(numero, costo).subscribe(ordini => {
  this.ListOrdini = ordini;
  this.ordine = null;
});
}

ordinaPerCostoDecrescente() {
  this.service.ordinaPerCostoDecrescente().subscribe(ordini => {
  this.ListOrdini = ordini;
  this.ordine = null;
});
}

trovaTraDueCosti(min: number, max: number) {
  this.service.trovaTraDueCosti(min, max).subscribe(ordini => {
  this.ListOrdini = ordini;
  this.ordine = null;
  });
}
}
