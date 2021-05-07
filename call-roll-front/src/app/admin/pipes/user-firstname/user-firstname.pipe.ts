import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFirstnamePipe'
})
export class UserFirstnamePipe implements PipeTransform {

  transform(users: Array<any>, filtre: string): Array<any> {
    if(!users)
      return [];
    if(!filtre)
      return users;
    return users.filter(e => e.firstname.toLowerCase().indexOf(filtre.toLowerCase()) > -1);
  }

}
