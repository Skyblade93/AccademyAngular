import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { aziendaService } from '../../Service/aziendaService';
import { AziendaDto } from '../../Dto/AziendaDto';
import { UserDto } from '../../Dto/UserDto';
import { AutoDto } from '../../Dto/AutoDto';

@Component({
  selector: 'app-add-azienda-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-azienda-component.html',
  styleUrl: './add-azienda-component.css',
})
export class AddAziendaComponent {

  constructor(private service: aziendaService) {}

  // FORM
  aziendaForm = new FormGroup({
    nomeAzienda: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    descrizione: new FormControl(''),
    titolareId: new FormControl<number | null>(null),
  });

  // OUTPUT (stile tuo AddUserComponent)
  @Output() aziendaCreated = new EventEmitter<AziendaDto>();

  // SUBMIT
  onSubmit(): void {

    if (this.aziendaForm.invalid) return;

    const nomeAzienda = this.aziendaForm.get('nomeAzienda')!.value;
    const descrizione = this.aziendaForm.get('descrizione')?.value ?? '';
    const titolareId = Number(this.aziendaForm.get('titolareId')?.value);

    const newAzienda = new AziendaDto(
      nomeAzienda,
      descrizione,
      0,
      new UserDto('', '', titolareId),
      new AutoDto('', '', '', '', null, null)
    );

    this.service.insert(newAzienda).subscribe({
      next: (res: AziendaDto) => {

        // reset form
        this.aziendaForm.reset();

        // emit verso parent
        this.aziendaCreated.emit(res);
      },
      error: (err: any) => console.error(err),
    });
  }
}
