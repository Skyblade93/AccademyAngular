export class ContactDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userId: number;
  
    constructor(
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      phoneNumber: string,
      userId: number
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.userId = userId;
    }
  }