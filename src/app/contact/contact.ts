import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../Service/contactService';
import { ContactDto } from '../Dto/ContactDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})

export class ContactComponent implements OnInit {
  // Signals stato iniziale
  contatti = signal<ContactDto[]>([]);
  selectedContact = signal<ContactDto>(new ContactDto(0, '', '', '', '', 0));
  editMode = signal<boolean>(false);

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.caricaContatti();
  }

  caricaContatti(): void {
    this.contactService.getAll().subscribe({
      next: (data: ContactDto[]) => this.contatti.set(data),
      error: (err: HttpErrorResponse) => console.error('Errore nel caricamento:', err),
    });
  }

  search(nome: string): void {
    if (nome.trim()) {
      this.contactService.findByNome(nome).subscribe({
        next: (data: ContactDto[]) => this.contatti.set(data),
        error: (err: HttpErrorResponse) => console.error('Errore nella ricerca:', err)
      });
    } else {
      this.caricaContatti();
    }
  }

  salva(): void {
    const currentContact: ContactDto = this.selectedContact();

    if (this.editMode()) {
      // MODIFICA
      this.contactService.update(currentContact).subscribe({
        next: () => {
          this.contatti.update((lista: ContactDto[]) => 
            lista.map((c: ContactDto) => c.id === currentContact.id ? { ...currentContact } : c)
          );
          this.annullaEdit();
        },
        error: (err: HttpErrorResponse) => console.error('Errore modifica:', err)
      });
    } else {
      // CREAZIONE
      const contattoNuovo = {
        firstName: currentContact.firstName,
        lastName: currentContact.lastName,
        email: currentContact.email,
        phoneNumber: currentContact.phoneNumber
      };

      this.contactService.insert(contattoNuovo as any).subscribe({
        next: (nuovoContatto: ContactDto) => {
          this.contatti.update((lista: ContactDto[]) => [...lista, nuovoContatto]);
          this.annullaEdit();
          alert('Contatto salvato! 🚀');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Errore salvataggio:', err);
          alert('Errore dal server. Controlla i dati inviati.');
        }
      });
    }
  }

  preparaModifica(c: ContactDto): void {
    this.selectedContact.set({ ...c });
    this.editMode.set(true);
  }

  annullaEdit(): void {
    this.selectedContact.set(new ContactDto(0, '', '', '', '', 0));
    this.editMode.set(false);
  }

  elimina(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo contatto?')) {
      this.contactService.delete(id).subscribe({
        next: () => {
          this.contatti.update((lista: ContactDto[]) => lista.filter((c: ContactDto) => c.id !== id));
        },
        error: (err: HttpErrorResponse) => console.error('Errore eliminazione:', err)
      });
    }
  }
}