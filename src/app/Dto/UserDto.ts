
export class UserDto {

  id ?: number | null;

  name: string;

  description : string;


  constructor(name : string, description: string, id: number | null) {
    this.name = name;
    this.description = description;
    this.id = id ;
  }
}
