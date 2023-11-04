import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {DepartmentComponent} from "./department/department.component";
import {PublicComponent} from "./public/public.component";
import {CreateComponent} from "./create/create.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'department',component:DepartmentComponent},
  {path:'public',component:PublicComponent},
  {path:'create',component:CreateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
