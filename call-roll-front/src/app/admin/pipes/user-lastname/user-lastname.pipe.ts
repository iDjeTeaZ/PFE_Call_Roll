import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userLastnamePipe'
})
export class UserLastnamePipe implements PipeTransform {

  transform(users: Array<any>, filtre: string): Array<any> {
    if(!users)
      return [];
    if(!filtre)
      return users;
    return users.filter(e => e.lastname.toLowerCase().indexOf(filtre.toLowerCase()) > -1);
  }
}
