export interface StudentI {
  _id:string;
  email:string;
  status:number;
  firstname:string;
  lastname:string;
  photo?:string;
  promotion?:string;
  specialty?:string;
  group?:string;
}

export class Student implements StudentI {
  _id = "";
  email = "";
  status = 1;
  firstname = "";
  lastname = "";
  photo?: "";
  promotion?: string | undefined;
  specialty?: string | undefined;
  group?: string | undefined;
}
