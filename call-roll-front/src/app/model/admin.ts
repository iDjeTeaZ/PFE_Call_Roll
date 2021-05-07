export interface AdminI {
    _id:string;
    email:string;
    status:number;
    firstname:string;
    lastname:string;
    photo?:string;
  }
  
  export class Admin implements AdminI {
    _id = "";
    email= "";
    status = 3;
    firstname = "";
    lastname = "";
    photo?: string | undefined;
  }
  