import { UsersListComponent } from './users-list/users-list.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddCourseComponent } from './add-course/add-course.component';

const routes:Routes = [
  {path: '', component:HomeComponent, children:[
  {path: 'usersList/:i',component:UsersListComponent, children:[
    {path:'', component:HomeComponent},
    {path:'student', component: StudentComponent},
    {path:'teacher', component: TeacherComponent},
    {path:'admin', component: AdminComponent},
  ]},
  {path:'student', component:StudentComponent},
  {path:'teacher', component: TeacherComponent},
  {path:'admin', component: AdminComponent},
  {path:'add-user', component: AddUserComponent},
  {path:'', component: AddCourseComponent}
  ]
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AdminRoutingModule { }
