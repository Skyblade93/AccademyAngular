import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { parcelService } from '../Service/parcelService';
import { ParcelDto } from '../Dto/ParcelDto';
import { AddParcelComponent } from '../addOn/add-parcel-component/add-parcel-component';

@Component({
  selector: 'app-parcel-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AddParcelComponent],
  templateUrl: './parcel-component.html',
  styleUrl: './parcel-component.css',
})
export class ParcelComponent implements OnInit {
  service: parcelService;

  Parcels = signal<ParcelDto[]>([]);

  searchResult = signal<ParcelDto | null>(null);
  searchResults = signal<ParcelDto[]>([]);
  isSearching = signal(false);
  isError = signal(false);

  maxId = computed(() => {
    const parcels = this.Parcels();
    if (parcels.length === 0) return 0;
    return Math.max(...parcels.map((p) => p.id));
  });

  parcel: ParcelDto = new ParcelDto(
    0,
    'Nessun',
    'Destinatario',
    'Nessun',
    'Mittente',
    0,
    0,
    0,
    0,
    false,
  );

  isPopupVisible = signal(false);

  ngOnInit() {}

  constructor(service: parcelService) {
    this.service = service;
    this.loadParcels();
  }

  loadParcels() {
    this.service.getAll().subscribe({
      next: (parcels) => {
        this.Parcels.set(parcels);
      },
      error: (err) => {
        console.error('Error loading parcels', err);
      },
    });
  }

  haveParcel(id: number) {
    this.service.read(id).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.searchResult.set(parcel);
      },
      error: (err) => {
        console.error('Error reading parcel', err);
      },
    });
  }

  deleteParcel(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        const updatedList = this.Parcels().filter((p) => p.id !== id);
        this.Parcels.set(updatedList);
      },
      error: (err) => {
        console.error('Error deleting parcel', err);
      },
    });
  }

  findByWeight(weight: number) {
    this.isSearching.set(true);
    this.service.findByWeight(weight).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.searchResult.set(parcel);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.isError.set(true);
      },
    });
  }

  findByHeight(height: number) {
    this.isSearching.set(true);
    this.service.findByHeight(height).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.searchResult.set(parcel);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.isError.set(true);
      },
    });
  }

  findByReceiverName(receiverName: string) {
    this.isSearching.set(true);
    this.service.findByReceiverName(receiverName).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.searchResult.set(parcel);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.isError.set(true);
      },
    });
  }

  findByReceiverSurname(receiverSurname: string) {
    this.isSearching.set(true);
    this.isError.set(false);
    this.service.findByReceiverSurname(receiverSurname).subscribe({
      next: (parcel) => {
        this.searchResults.set([parcel]);
        this.searchResult.set(null);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.isError.set(true);
      },
    });
  }

  findBySenderName(senderName: string) {
    this.isSearching.set(true);
    this.service.findBySenderName(senderName).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.searchResult.set(parcel);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.isError.set(true);
      },
    });
  }

  findBySenderSurname(senderSurname: string) {
    this.isSearching.set(true);
    this.service.findBySenderSurname(senderSurname).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.searchResult.set(parcel);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.isError.set(true);
      },
    });
  }

  togglePopup() {
    this.isPopupVisible.update((v) => !v);
  }

  resetSearch() {
    this.isSearching.set(false);
    this.searchResults.set([]);
    this.searchResult.set(null);
    this.isError.set(false);
  }

  onParcelAdded(newParcel: ParcelDto) {
    this.loadParcels();
  }
}
