import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DipendenteService } from '../../Service/dipendenteService';
import { DipendenteDto } from '../../Dto/DipendenteDto';

@Component({
  selector: 'app-add-dipendente-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-dipendente-component.html',
  styleUrl: './add-dipendente-component.css',
})
export class AddDipendenteComponent {

  successMessage: string | null = null;

  constructor(private service: DipendenteService) {}

  // input dal padre (non più usato per id ma lasciato)
  count = input<number>(0);

  @Output() countValue = new EventEmitter<DipendenteDto>();

  sendCount(dipendenteDto: DipendenteDto) {
    this.countValue.emit(dipendenteDto);
  }

  @Output() close = new EventEmitter<void>();

  dipendenteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
    eta: new FormControl<number | null>(null),
    email: new FormControl(''),
    telefono: new FormControl<number | null>(null),
  });

  onSubmit(): void {
    if (this.dipendenteForm.invalid) return;

    const dto = new DipendenteDto(
      this.dipendenteForm.value.nome!,
      this.dipendenteForm.value.cognome!,
      this.dipendenteForm.value.eta!,
      this.dipendenteForm.value.email!,
      this.dipendenteForm.value.telefono!,
      undefined as unknown as number
    );

    // 🔥 backend call
    this.service.insert(dto).subscribe({
      next: () => {
        this.dipendenteForm.reset();

        this.successMessage = 'Dipendente inserito con successo';
        setTimeout(() => this.successMessage = null, 2000);
      },
      error: (err: any) => console.error(err),
    });
  }
}
