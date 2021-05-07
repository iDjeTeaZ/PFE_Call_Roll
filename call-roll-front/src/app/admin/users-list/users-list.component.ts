import { UsersService } from '../services/users/users.service';
import { Component, OnInit } from '@angular/core';

import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

   /**
    * Déclaration de l'icone pour le bouton gauche de la pagination
    */
   faArrowCircleLeft = faArrowCircleLeft;
   /**
     * Déclaration de l'icone pour le bouton droit de la pagination
     */
   faArrowCircleRight = faArrowCircleRight;
   /**
     * Déclaration de la variable pagination contenant un min et un max
     */
   pagination = {min:0, max: 6};
   /**
     * Déclaration de la variable tri à vide
     */
   triLastname: string = "";
   /**
     * Déclaration de la variable tri à vide
     */
    triFirstname: string = "";

    userType: number = 1;

   /**
     * Constructeur
     * @param {AdminiServicesService} servEtu le service d'accès aux données du fichier etudiants.json
     */
   constructor(public servUsers:UsersService, private router: Router, private routeParametres:ActivatedRoute){
    }

   /**
     * Gestion de la pagination
     * @param {number} n le nombre de décallage de carte étudiants affiché
     */
   setPagination(n:number){
     if((n < 0 && this.pagination.min > 0) || (n > 0 && this.pagination.max < this.servUsers.usersList.length) ) {
       this.pagination.min += n;
       this.pagination.max += n;
     }
   }

   getUser(_id: string) {
     if(this.userType == 1)
      this.router.navigate(['/admin/student'], {state: {data: _id}});
     else if (this.userType == 2)
      this.router.navigate(['/admin/teacher'], {state: {data: _id}});
     else 
     this.router.navigate(['/admin/admin'], {state: {data: _id}});
    
   }

   /**
     * Vide
     */
   ngOnInit(): void { 
    this.routeParametres.params.subscribe(
      parametres => {
        console.log("Paramètres de la route", parametres);
        if(parametres['i']){
          this.userType = parametres['i'];
          this.servUsers.getUsersFromBackByStatus(this.userType);
        }
      }
    )
   }
}
