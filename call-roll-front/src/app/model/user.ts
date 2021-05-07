export interface UserI {
    _id:string;
    email:string;
    status:number;
    firstname:string;
    lastname:string;
    photo?:string;
  }
  
  export class User implements UserI {
    _id= "";
    email= "";
    status = 0;
    firstname = "";
    lastname = "";
    photo?: string | undefined;
  }
  