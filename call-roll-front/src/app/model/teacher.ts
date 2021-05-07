export interface TeacherI {
  _id:string;
  email:string;
  status:number;
  firstname:string;
  lastname:string;
  photo?:string;
  courses?: Array<Courses>;
  classManager?:string;
}

export class Teacher implements TeacherI {
  _id = "";
  email = "";
  status = 2;
  firstname = "";
  lastname = "";
  photo?: string | undefined;
  courses?: any;
  classManager?: string | undefined;
}

export interface CoursesI {
  course?:string;
  promotion?:string;
  specialty?:string;
  group?:string;
}

export class Courses implements CoursesI {
  course?:"";
  promotion?:"";
  specialty?:"";
  group?:"";
}