
import { UserDto } from "../Dto/UserDto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AbstractService } from "./abstract-service";

@Injectable({
  providedIn: 'root'
})
export class userService extends AbstractService<UserDto>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'User';
     const baseProjectUrl = this.baseUrl + '/' + this.type;

  }




}
