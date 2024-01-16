import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {DepartmentComponent} from "./department/department.component";
import {PublicComponent} from "./public/public.component";
import {CreateComponent} from "./create/create.component";
import {PastConferencesComponent} from "./past-conferences/past-conferences.component";
import {FutureConferencesComponent} from "./future-conferences/future-conferences.component";
import {CalendarViewComponent} from "./calendar-view/calendar-view.component";
import {UpdateConferenceComponent} from "./update-conference/update-conference.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'department',component:DepartmentComponent},
  {path:'public',component:PublicComponent},
  {path:'create',component:CreateComponent},
  {path:'pastConf',component:PastConferencesComponent},
  {path:'futureConf',component:FutureConferencesComponent},
  {path:'calendar',component:CalendarViewComponent},
  {path:'update',component:UpdateConferenceComponent},
  {path:'adminpage',component:AdminPageComponent},
  { path: 'logout', component: LogoutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
