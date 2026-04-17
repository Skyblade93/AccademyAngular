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

  // 👇 INPUT come nel tuo esempio
  count = input<number>(0);

  // 👇 OUTPUT
  @Output() dipendenteCreated = new EventEmitter<DipendenteDto>();
  @Output() close = new EventEmitter<void>();

  // 👇 FORM
  dipendenteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
    eta: new FormControl<number | null>(null),
    email: new FormControl(''),
    telefono: new FormControl<number | null>(null),
  });


  // =========================
  // SUBMIT
  // =========================
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

    // 👉 chiamata backend (IGNORATA)
    this.service.insert(dto).subscribe({
      next: () => {
        this.dipendenteForm.reset();

        // 🔥 FAKE ID COME USER
        next: (res: DipendenteDto) => {
          this.dipendenteCreated.emit(res);
        }

        // 🔥 EMIT
        this.dipendenteCreated.emit(dto);

        // 🔥 POPUP
        this.successMessage = 'Dipendente inserito con successo';

        setTimeout(() => {
          this.successMessage = null;
        }, 2000);
      },
      error: (err: any) => console.error(err),
    });

    // 🔥 FAKE ID IDENTICO A USER
    dto.id = this.count().valueOf() + 1;

    // 🔥 EMIT SUBITO (FUORI DALLA SUBSCRIBE)
    this.dipendenteCreated.emit(dto);

    // 🔥 POPUP
    this.successMessage = 'Dipendente inserito con successo';

    setTimeout(() => {
      this.successMessage = null;
    }, 2000);
  }




}
