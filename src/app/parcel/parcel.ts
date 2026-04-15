import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { parcelService } from '../Service/parcelService';
import { ParcelDto } from '../Dto/ParcelDto';

@Component({
  selector: 'app-parcel',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './parcel.html',
  styleUrl: './parcel.css',
})
export class ParcelComponent implements OnInit {

  service: parcelService;

  ListParcel: ParcelDto[] = [];

  parcel: ParcelDto = new ParcelDto(0,'', '', '', '', 0, 0, 0, 0, false);

  ngOnInit() {
    
  }

  constructor(service: parcelService) {
    this.service = service;
    service.getAll().subscribe(parcels => {
      this.ListParcel = parcels;
    });
  }

  haveParcel(id: number) {
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


}
