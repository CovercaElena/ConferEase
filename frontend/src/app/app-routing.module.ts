import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {DepartmentComponent} from "./department/department.component";
import {PublicComponent} from "./public/public.component";
import {CreateComponent} from "./create/create.component";
import {PastConferencesComponent} from "./past-conferences/past-conferences.component";
import {FutureConferencesComponent} from "./future-conferences/future-conferences.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'department',component:DepartmentComponent},
  {path:'public',component:PublicComponent},
  {path:'create',component:CreateComponent},
  {path:'pastConf',component:PastConferencesComponent},
  {path:'futureConf',component:FutureConferencesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
