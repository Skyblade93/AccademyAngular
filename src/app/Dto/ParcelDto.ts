export class ParcelDto {
    
    id: number;

    receiverName: string;

    receiverSurname: string;

    senderName: string;
    
    senderSurname: string;

    weight: number;

    height: number;
    
    width: number;

    length: number;
    
    fragile: boolean;

    constructor(id: number,receiverName: string, receiverSurname: string, senderName: string, senderSurname: string, weight: number, height: number, width: number, length: number, fragile: boolean) {
        this.id = id;
        this.receiverName = receiverName;
        this.receiverSurname = receiverSurname;
        this.senderName = senderName;
        this.senderSurname = senderSurname;

        this.weight = weight;
        this.height = height;
        this.width = width;
        this.length = length;
        this.fragile = fragile;
    }
     
}