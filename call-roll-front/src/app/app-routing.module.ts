import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin/admin.guard';
import { StudentGuard } from './guards/student/student.guard';
import { TeacherGuard } from './guards/teacher/teacher.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"admin", loadChildren: () => import('./admin/admin.module').then(e => e.AdminModule), canActivate:[AdminGuard], canLoad:[AdminGuard]},
  {path:"student", loadChildren: () => import('./student/student.module').then(e => e.StudentModule), canActivate:[StudentGuard], canLoad:[StudentGuard]},
  {path:"teacher", loadChildren: () => import('./teacher/teacher.module').then(e => e.TeacherModule), canActivate:[TeacherGuard], canLoad:[TeacherGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
