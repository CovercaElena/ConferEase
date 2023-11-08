import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScheduleModule, RecurrenceEditorModule} from '@syncfusion/ej2-angular-schedule';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './login/login.component';
import {PrimeNGConfig} from 'primeng/api'
import {MenubarModule} from "primeng/menubar";
import {MenuModule} from "primeng/menu";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {CommonModule} from "@angular/common";
import {DepartmentComponent} from './department/department.component';
import {CreateComponent} from './create/create.component';
import {PublicComponent} from './public/public.component';
import {SplitterModule} from "primeng/splitter";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    DepartmentComponent,
    CreateComponent,
    PublicComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ScheduleModule, RecurrenceEditorModule, MenubarModule,
        InputTextModule, ButtonModule, DialogModule, CheckboxModule, MenubarModule, FormsModule, SplitterModule, CardModule, ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
