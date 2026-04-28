import { Component, input, Output, EventEmitter } from '@angular/core';
import { OrdineDto } from './../../Dto/OrdineDto';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ordineService } from '../../Service/ordineService';

@Component({
  selector: 'app-add-ordine-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-ordine-component.html',
  styleUrl: './add-ordine-component.css',
})
export class AddOrdineComponent {


  constructor(private service: ordineService) {}

    ordineForm = new FormGroup({
      costo_totale: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      indirizzo_spedizione: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
          numero_prodotti: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    })

   @Output() countValue = new EventEmitter<OrdineDto>();

    sendCount(ordineDto: OrdineDto) {
      this.countValue.emit(ordineDto);
    }

    onSubmit(): void {

      if (this.ordineForm.invalid) return;

      const costo_totale = Number(this.ordineForm.get('costo_totale')!.value);
      const indirizzo_spedizione = this.ordineForm.get('indirizzo_spedizione')?.value ?? '';
      const numero_prodotti = Number(this.ordineForm.get('numero_prodotti')!.value);

      const newOrdine = new OrdineDto(
        undefined as unknown as number,
        costo_totale,
        numero_prodotti,
        indirizzo_spedizione,
      );

      this.service.insert(newOrdine).subscribe({
        next: (ordineCreato) => {
        this.countValue.emit(ordineCreato);
        this.ordineForm.reset();
      },
      error: (err: any) => console.error(err),
      });
    }
}
