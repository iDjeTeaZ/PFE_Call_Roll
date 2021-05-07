import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserService {
  private status:number = 0;
  private connection:boolean = false;
  private token:string = "";
  private email:string = "";
  private id:string ="";
  constructor() { }

  getStatus() {
    return this.status;
  }

  setStatus(status: number) {
    this.status = status;
  }

  getConnection() {
    return this.connection;
  }

  setConnection(connection: boolean) {
    this.connection = connection;
  }
  
  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  getEmail(){
    return this.email;
  }

  setEmail(email: string){
    this.email = email;
  }

  getId(){
    return this.id;
  }
  setId(id:string){
    this.id = id;
  }
}
