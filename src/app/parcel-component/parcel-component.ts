import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { parcelService } from '../Service/parcelService';
import { ParcelDto } from '../Dto/ParcelDto';
import { AddParcelComponent } from '../AddOn/add-parcel-component/add-parcel-component';

@Component({
  selector: 'app-parcel-component',
  standalone: true,
<<<<<<< HEAD:src/app/parcel/parcel.ts
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './parcel.html',
  styleUrl: './parcel.css',
=======
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AddParcelComponent],
  templateUrl: './parcel-component.html',
  styleUrl: './parcel-component.css',
>>>>>>> c014392 (update:):src/app/parcel-component/parcel-component.ts
})
export class ParcelComponent implements OnInit {

  service: parcelService;

  ListParcel: ParcelDto[] = [];
  searchResults: ParcelDto[] = [];
  isSearching = false;

  parcel: ParcelDto = new ParcelDto(0,'', '', '', '', 0, 0, 0, 0, false);

<<<<<<< HEAD:src/app/parcel/parcel.ts
  ngOnInit() {
    
  }
=======
  ParcelSignal = signal<ParcelDto[]>([]);
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

  isPopupVisible = false;

  ngOnInit() {}
>>>>>>> c014392 (update:):src/app/parcel-component/parcel-component.ts

  constructor(service: parcelService) {
    this.service = service;
    service.getAll().subscribe(parcels => {
      this.ListParcel = parcels;
    });
  }

  haveParcel(id: number) {
<<<<<<< HEAD:src/app/parcel/parcel.ts
  this.service.read(id).subscribe(parcel => {
  this.parcel = parcel;
})
}

findByWeight(weight: number) {
  this.service.findByWeight(weight).subscribe(parcel => {
    this.parcel = parcel; 
  });
}
findByHeight(height: number) {
  this.service.findByHeight(height).subscribe(parcel => {
    this.parcel = parcel; 
  });
}

findByReceiverName(receiverName: string) {
  this.service.findByReceiverName(receiverName).subscribe(parcel => {
    this.parcel = parcel; 
  });
}

findByReceiverSurname(receiverSurname: string) {
  this.service.findByReceiverSurname(receiverSurname).subscribe(parcel => {
    this.parcel = parcel; 
  }); 
}
findBySenderName(senderName: string) {
  this.service.findBySenderName(senderName).subscribe(parcel => {
    this.parcel = parcel; 
  });
}

findBySenderSurname(senderSurname: string) {
  this.service.findBySenderSurname(senderSurname).subscribe(parcel => {
    this.parcel = parcel; 
  }); 
}


=======
    this.service.read(id).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  deleteParcel(id: number) {
    this.service.delete(id).subscribe(() => {
      this.ListParcel = this.ListParcel.filter((p) => p.id !== id);
      this.ParcelSignal.set(this.ListParcel);
    });
  }

  findByWeight(weight: number) {
    this.service.findByWeight(weight).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }
  findByHeight(height: number) {
    this.service.findByHeight(height).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  findByReceiverName(receiverName: string) {
    this.service.findByReceiverName(receiverName).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  findByReceiverSurname(receiverSurname: string) {
    this.isSearching = true;
    this.service.findByReceiverSurname(receiverSurname).subscribe({
      next: (parcels) => {
        this.searchResults = parcels;
      },
      error: (_err) => {
        this.isPopupVisible = !this.isPopupVisible;
      },
    });
  }

  findBySenderName(senderName: string) {
    this.service.findBySenderName(senderName).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  findBySenderSurname(senderSurname: string) {
    this.service.findBySenderSurname(senderSurname).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  resetSearch() {
    this.isSearching = false;
    this.searchResults = [];
  }

  onParcelAdded(newParcel: ParcelDto) {
    this.service.getAll().subscribe((parcels) => {
      this.ListParcel = parcels;
    });
  }
>>>>>>> c014392 (update:):src/app/parcel-component/parcel-component.ts
}
