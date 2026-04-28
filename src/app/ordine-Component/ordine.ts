import { Component, computed, OnInit, signal } from '@angular/core';
import { OrdineDto } from '../Dto/OrdineDto';
import { ordineService } from '../Service/ordineService';
import { CommonModule } from '@angular/common';
import { AddOrdineComponent } from '../addOn/add-ordine-component/add-ordine-component';

@Component({
  selector: 'app-ordine',
  imports: [CommonModule, AddOrdineComponent],
  templateUrl: './ordine.html',
  styleUrl: './ordine.css',
  standalone: true,
})
export class OrdineComponent implements OnInit{

  service: ordineService;
  ListOrdini= signal<OrdineDto[]>([]);
  ordine: OrdineDto | null = null;;

  isPopupVisible = signal(false);
  istoggleAddOrdine = signal(false);

  sortedOrdini = computed(() =>
    [...this.ListOrdini()].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
  );

  count = computed(() => {
    const list = this.ListOrdini();
    return list.length
      ? Math.max(...list.map(u => u.id ?? 0))
      : 0;
  });

  ngOnInit(){

}

  constructor(service: ordineService) {
    this.service = service;
  }

  getAll() {
  this.service.getAll().subscribe(ordini => {
  this.ordine = null;
  this.ListOrdini.set(ordini);
  })
  }

  findById(id: number) {
  this.service.findById(id).subscribe(ordine => {
  this.ordine = ordine;
  })
  }

  deleteById(id: number) {
  this.service.deleteById(id).subscribe(ordine => {
  this.ordine = null;
  this.getAll();
  })
  }

  trovaConCostoUguale(costo: number) {
  this.service.trovaConCostoUguale(costo).subscribe(ordini => {
  this.ordine = null;
this.ListOrdini.set(ordini);  })
  }

  trovaConNumeroProdottiMaggiore(num_prodotti: number) {
  this.service.trovaConNumeroProdottiMaggiore(num_prodotti).subscribe(ordini => {
this.ListOrdini.set(ordini);  this.ordine = null;
  });
}

trovaConIndirizzo(indirizzo: string) {
  this.service.trovaConIndirizzo(indirizzo).subscribe(ordini => {
this.ListOrdini.set(ordini);
  this.ordine = null;
  });
}

trovaConCostoMaggiore(costo: number) {
  this.service.trovaConCostoMaggiore(costo).subscribe(ordini => {
  this.ordine = null;
this.ListOrdini.set(ordini);
  });
}

trovaConCostoMinore(costo: number) {
  this.service.trovaConCostoMinore(costo).subscribe(ordini => {
  this.ordine = null;
this.ListOrdini.set(ordini);
  });
}

trovaPerUtente(utente: number) {
  this.service.trovaPerUtente(utente).subscribe(ordini => {
this.ListOrdini.set(ordini);
  this.ordine = null;
  });
}

filtro(numero: number, costo: number) {
  this.service.filtro(numero, costo).subscribe(ordini => {
this.ListOrdini.set(ordini);  this.ordine = null;

});
}

ordinaPerCostoDecrescente() {
  this.service.ordinaPerCostoDecrescente().subscribe(ordini => {
this.ListOrdini.set(ordini);
  this.ordine = null;
});
}

trovaTraDueCosti(min: number, max: number) {
  this.service.trovaTraDueCosti(min, max).subscribe(ordini => {
this.ListOrdini.set(ordini);
  this.ordine = null;
  });
}

  onOrdineCreated(ordine: OrdineDto): void {
    this.getAll();
  }

  togglePopup(): void {
    this.isPopupVisible.update(v => !v);
  }

    toggleAddOrdine(): void {
    this.istoggleAddOrdine.update(v=> !v);
  }
}
