import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, AdminI } from 'src/app/model/admin';
import { Student, StudentI } from 'src/app/model/student';
import { Teacher, TeacherI } from 'src/app/model/teacher';
import { User, UserI } from 'src/app/model/user';
import { ConnectedUserService } from 'src/app/services/connectedUser/connected-user.service';
import { Abs } from 'src/app/model/event';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersList: Array<UserI> = [];
  student: StudentI = new Student();
  admin: AdminI = new Admin();
  teacher: TeacherI = new Teacher();
  id: string = "";
  absences: { name: string; teacher: string; startDate: Date; }[] = [];

  getUsersFromBackByStatus(status: number){
    var auth = this.connectedUserServ.getToken()
    this.http.get<Array<User>>( 'http://0.0.0.0:5001/users/' + status, {headers: {Authorization: auth}})
      .subscribe(
        data => {
          this.usersList = data;
          this.usersList.sort(function sortByName(a: User, b: User) {
            if (a.lastname < b.lastname)
              return -1;
            if (a.lastname > b.lastname )
              return 1;
            if (a.firstname < b.firstname)
              return -1;
            if (a.firstname > b.firstname)
              return 1;
            return 0;
          })
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      )
  }

  deleteUserById(id: string){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken()
      this.http.delete('http://0.0.0.0:5001/user/' + id, {headers: {Authorization: auth}})
        .subscribe(
          data => {
            resolve();
          },
          (error) => {
            reject('Erreur ! : ' + error);
            return;
          }
      )
    });
  }

  putCourse(payload: any){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken()
      this.http.put('http://0.0.0.0:5001/course', payload, {headers: {Authorization: auth}})
        .subscribe(
          data => {
            console.log(data)
            resolve();
          },
          (error) => {
            reject('Erreur ! : ' + error);
            return;
          }
      )
    });
  }

  putUser(payload: any){
    return new Promise<string>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken()
      this.http.put<string>('http://0.0.0.0:5001/user', payload, {headers: {Authorization: auth}})
        .subscribe(
          data => {
            console.log(data)
            this.id = data
            resolve(this.id);
          },
          (error) => {
            reject('Erreur ! : ' + error);
            return;
          }
      )
    });
  }

  patchPassword(id: String, password: string | Int32Array){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken();
      const payload = {
        password: password
      };
      this.http.patch('http://0.0.0.0:5001/user/' + id, payload, {headers: {Authorization: auth}})
      .subscribe(() => {
        resolve();
      },
      (error) => {
        reject('Erreur ! : ' + error);
            return;
      })
    });
  }

  getStudentFromBackById(id: string){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken()
      this.http.get<Student>('http://0.0.0.0:5001/student/' + id, {headers: {Authorization: auth}})
        .subscribe(
          data => {
            this.student = data;
            resolve();
          },
          (error) => {
            reject('Erreur ! : ' + error);
            return;
          }
      )
    });
  }

  patchStudent(student: StudentI){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken();
      const payload = {
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        photo: student.photo,
        promotion: student.promotion,
        specialty: student.specialty,
        group: student.group,
      };
      this.http.patch('http://0.0.0.0:5001/user/' + student._id, payload, {headers: {Authorization: auth}})
      .subscribe(() => {
        console.log(student);
        resolve();
      },
      (error) => {
        reject('Erreur ! : ' + error);
            return;
      })
    });
  }

  getAbsByEmail(email: string){
    var auth = this.connectedUserServ.getToken();
    this.http.get<any>('http://0.0.0.0:5001/AbsenceByEmail/' + email, {headers: {Authorization: auth}})
      .subscribe(
        data => { 
          this.absences = []; 
          for(let i = 0 ; i < data.length ; i++){
          	let tmpAbsence  = {
          		name : data[i].name,
          		teacher : data[i].classes.teacher,
          		startDate : new Date(data[i].classes.rooms.startDate.$date),
          	}
          	this.absences.push(tmpAbsence);
          }
          console.log(this.absences);
        },
        error => {
          console.log(error);
        }
      )
  }

  getTeacherFromBackById(id: string){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken()
      this.http.get<Teacher>('http://0.0.0.0:5001/teacher/' + id, {headers: {Authorization: auth}})
        .subscribe(
          data => {
            this.teacher = data;
            resolve();
          },
          (error) => {
            reject('Erreur ! : ' + error);
            return;
          }
      )
    });
  }

  patchTeacher(teacher: TeacherI){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken();
      const payload = {
        firstname: teacher.firstname,
        lastname: teacher.lastname,
        email: teacher.email,
        photo: teacher.photo,
        classManager: teacher.classManager,
      };
      this.http.patch('http://0.0.0.0:5001/user/' + teacher._id, payload, {headers: {Authorization: auth}})
      .subscribe(() => {
        console.log(teacher);
        resolve();
      },
      (error) => {
        reject('Erreur ! : ' + error);
            return;
      })
    });
  }

  getAdminFromBackById(id: string){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken()
      this.http.get<Admin>('http://0.0.0.0:5001/admin/' + id, {headers: {Authorization: auth}})
        .subscribe(
          data => {
            this.admin = data;
            resolve();
          },
          (error) => {
            reject('Erreur ! : ' + error);
            return;
          }
      )
    });
  }

  patchAdmin(admin: AdminI){
    return new Promise<void>((resolve, reject) => {
      var auth = this.connectedUserServ.getToken();
      const payload = {
        firstname: admin.firstname,
        lastname: admin.lastname,
        email: admin.email,
        photo: admin.photo,
      };
      this.http.patch('http://0.0.0.0:5001/user/' + admin._id, payload, {headers: {Authorization: auth}})
      .subscribe(() => {
        console.log(admin);
        resolve();
      },
      (error) => {
        reject('Erreur ! : ' + error);
            return;
      })
    });
  }

  /**
    * R??cup??re les donn??es
    * @param {HttpClient} http permet de faire des requ??tes http
    */

   constructor(private http:HttpClient, public connectedUserServ:ConnectedUserService) {
  }
}
