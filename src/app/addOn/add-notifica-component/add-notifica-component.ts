import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificaService } from '../../Service/NotificaService';
import { NotificaDto } from '../../Dto/NotificaDto';
import { TipoNotifica, PrioritaNotifica } from '../../Dto/enums/notifica-enums';

@Component({
  selector: 'app-add-notifica-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-notifica-component.html',
  styleUrl: './add-notifica-component.css',
})
export class AddNotificaComponent {

  notificaCreata = output<NotificaDto>();

  protected readonly TipoEnum = TipoNotifica;
  protected readonly PrioritaEnum = PrioritaNotifica;

  private service = inject(NotificaService);

  notificaForm = new FormGroup({
    titolo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    messaggio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priorita: new FormControl<PrioritaNotifica>(PrioritaNotifica.MEDIA, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tipo: new FormControl<TipoNotifica>(TipoNotifica.INFORMAZIONE, {
      nonNullable: true,
      validators: [Validators.required],
    })
  });

  onSubmit(): void {
    if (this.notificaForm.invalid) return;

    const formValues = this.notificaForm.getRawValue();

    const now = new Date();
    const dataFormattata = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newNotifica = new NotificaDto(
      formValues.titolo,
      formValues.messaggio,
      formValues.tipo,
      formValues.priorita,
      dataFormattata,

      false
    );

    this.service.insert(newNotifica).subscribe({
      next: (res: NotificaDto) => {
        console.log('Notifica inserita con successo:', res);

        this.notificaCreata.emit(res);

        this.notificaForm.reset({
          titolo: '',
          messaggio: '',
          priorita: PrioritaNotifica.MEDIA,
          tipo: TipoNotifica.INFORMAZIONE
        });
      },
      error: (err) => {
        console.error('Errore durante l\'inserimento:', err);
      }
    });
  }
}
