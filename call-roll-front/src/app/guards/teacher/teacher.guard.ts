import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectedUserService } from 'src/app/services/connectedUser/connected-user.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate, CanLoad {
  constructor(private connectedUserServ:ConnectedUserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.connectedUserServ.getConnection();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.connectedUserServ.getStatus() > 1;
  }
}
