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

  constructor(private service: DipendenteService) {}

  @Output() close = new EventEmitter<void>();
  @Output() dipendenteCreated = new EventEmitter<DipendenteDto>();

  dipendenteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
    eta: new FormControl<number | null>(null),
    email: new FormControl(''),
    telefono: new FormControl<number | null>(null),
  });

  onSubmit(): void {
    if (this.dipendenteForm.invalid) return;

    const dto: DipendenteDto = {
      id: undefined as any,
      nomeDipendente: this.dipendenteForm.value.nome!,
      cognomeDipendente: this.dipendenteForm.value.cognome!,
      eta: this.dipendenteForm.value.eta!,
      email: this.dipendenteForm.value.email!,
      numeroTelefono: this.dipendenteForm.value.telefono!
    };

    this.service.insert(dto).subscribe({
      next: (res: DipendenteDto) => {

        this.dipendenteCreated.emit(res);
        this.dipendenteForm.reset();

        // 🔥 popup successo
        this.successMessage = 'Dipendente inserito con successo';

        setTimeout(() => {
          this.successMessage = null;
        }, 2000);

      },
      error: err => console.error(err)
    });
  }

  successMessage: string | null = null;


}